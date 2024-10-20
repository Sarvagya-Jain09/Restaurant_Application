import mongoose from "mongoose";

const deliveryModel = new mongoose.Schema({
    name : String,
    password : String,
    contact : String,
    city : String
});

export const deliveryPartnerSchema = mongoose.models.deliverypartner || 
mongoose.model("deliverypartner",deliveryModel)