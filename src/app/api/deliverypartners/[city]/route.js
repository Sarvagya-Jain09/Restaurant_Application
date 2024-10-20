import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionURL } from "../../../lib/db";
import {deliveryPartnerSchema} from "../../../lib/deliveryModel"

export async function GET(request,content)
{
    let city = content.params.city
    let success = false;
    await mongoose.connect(connectionURL,{useNewUrlParser:true})
    let filter =  {city : {$regex : new RegExp(city,'i')}}
    let result = await deliveryPartnerSchema.find(filter)
    return NextResponse.json({result})
}