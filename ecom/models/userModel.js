import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}
},{minimize:false}) //
//Mongoose removes empty objects from documents (minimize: true) false ensures that empty object are not removed from the document
const userModel = mongoose.models.user || mongoose.model("user", userSchema)
//checks If it exists, it uses that model; otherwise, it creates a new model 
export default userModel;