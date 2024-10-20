import mongoose from "mongoose";
import { orderSchema } from "../../../../lib/ordersModel";
import { connectionURL } from "../../../../lib/db";
import { NextResponse } from "next/server";
import { restaurantSchema } from "../../../../lib/restaurantModel";

export async function GET(request,content)
{
    let id = content.params.id
    let success = false;
    await mongoose.connect(connectionURL,{useNewUrlParser : true})
    let result = await orderSchema.find({deliveryBoy_Id : id})
    if(result)
    {
        success = true;   
        let restoData = await Promise.all(
            result.map(async (item) => {
                let restoInfo = {}
                restoInfo.data = await restaurantSchema.findOne({_id : item.resto_Id})
                restoInfo.amount = item.Amount
                restoInfo.status = item.status
                return restoInfo;
            })
        )
        result = restoData;
    }
    return NextResponse.json({result,success})
}