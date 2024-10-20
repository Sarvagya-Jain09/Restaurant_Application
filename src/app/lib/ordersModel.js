import mongoose from "mongoose";

const OrdersModel = new mongoose.Schema({
    user_Id : mongoose.Schema.Types.ObjectId,
    resto_Id : mongoose.Schema.Types.ObjectId,
    deliveryBoy_Id : mongoose.Schema.Types.ObjectId,
    foodItemIds : String,
    Amount:String,
    status : String
});
export const orderSchema = mongoose.models.orders || 
mongoose.model("orders", OrdersModel)