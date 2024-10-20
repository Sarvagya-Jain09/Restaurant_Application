import mongoose from "mongoose";

const restaurantModel = new mongoose.Schema({
    email:String,
    password:String,
    name:String,
    city:String,
    Address:String,
    contact:String
});

export const restaurantSchema = mongoose.models.restaurants || 
mongoose.model("restaurants",restaurantModel);

