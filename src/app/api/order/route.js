import mongoose from "mongoose";
import { orderSchema } from "../../lib/ordersModel";
import {connectionURL} from '../../lib/db'
import { NextResponse } from "next/server";
import { restaurantSchema } from "../../lib/restaurantModel";

export async function POST(request)
{
    let payload = await request.json()
    await mongoose.connect(connectionURL,{useNewUrlParser : true})
    let success = false;
    let final = new orderSchema(payload)
    let data = await final.save()
    if(data)
    {
        success=true;
    }
    return NextResponse.json({data,success})
}

export async function GET(request)
{
    let userId = request.nextUrl.searchParams.get('id')
    let success = false;
    await mongoose.connect(connectionURL,{useNewUrlParser : true})
    let result = await orderSchema.find({user_Id : userId})
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