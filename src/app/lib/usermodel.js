import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    city:String,
    Address:String,
    contact:String
});


export const userSchema = mongoose.models.users || 
mongoose.model("users",UserModel);
