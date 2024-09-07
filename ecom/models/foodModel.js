import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true}
})

const foodModel = mongoose.model.furniture || mongoose.model("furniture",foodSchema) //create food collection at db

export default foodModel