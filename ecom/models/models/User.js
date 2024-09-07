import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: String,
  email: { type: String, required: true, unique: true },
  cartData:{type:Object,default:{}}},{minimize:false})

const User = mongoose.model("User", userSchema);

export default User

