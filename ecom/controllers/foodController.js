import foodModel from '../models/foodModel.js'

/*
import fs from 'fs'
const addFood = async (req,res) => {

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        image:image_filename
    })
}
*/

//insert new food item by admin
const addFood = async (req,res) => {
    const {image} = req.body
    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image
    })
    try {
        await food.save();
        res.json({success:true,message:"Furniture Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

// all food list
const listFood = async (req,res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
        console.log(foods)
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// remove food item
const removeFood = async (req,res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        await foodModel.findByIdAndDelete(req.body.id); //remove food item from db
        res.json({success:true,message:"Furniture Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


export {addFood,listFood,removeFood}