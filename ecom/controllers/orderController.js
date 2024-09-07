import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import User from "../models/models/User.js";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const placeOrder = async (req, res) => {

    const frontend_url = "http://localhost:5173";

    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save();
        await User.findByIdAndUpdate(req.body.userId,{cartData:{}}); //clear cart data after placing order

        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*80
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*80
            },
            quantity:1
        })
//a way to collect payment details and complete a transaction in a secure and streamlined manner.
        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({success:true,session_url:session.url})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const verifyOrder = async (req,res) => {
    const {orderId,success} = req.body
    try{
        if(success=='true'){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            res.json({success:true,message:'Paid'})
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false,message:'not paid'})
        }
    }catch(error){
        console.log(error)
        res.json({success:false,message:'error'})
    }
}

const userOrders = async (req, res) => {

    try{
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})

    }catch(error){
        console.log(error);
        res.json({success:false,message:'error'})
    }

}
//admin
const listOrders = async (req, res) => {
    try{
        const orders = await orderModel.find({})
        res.json({success:true,data:orders})
    }catch(error){
        res.json({success:false,message:'error occured'})
    }
}
const updateStatus = async(req,res)=>{
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})//check frontend id with backend id
        res.json({success:true,message:'Status updated'})
    }catch(error){
        console.log(error)
        res.json({success:false,message:'Error occured'})
    }
}
export {verifyOrder,placeOrder,userOrders,listOrders,updateStatus}