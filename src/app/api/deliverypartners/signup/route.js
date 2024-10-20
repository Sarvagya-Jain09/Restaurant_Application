import mongoose from "mongoose";
import { deliveryPartnerSchema } from "../../../lib/deliveryModel";
import { NextResponse } from "next/server";
import { connectionURL } from "../../../lib/db";

export async function POST(request)
{
    let payload = await request.json();
    await mongoose.connect(connectionURL,{useNewUrlParser:true})
    let success = false;
    let data = new deliveryPartnerSchema(payload)
    let result = await data.save();
    if(result)
    {
        success=true;
    }
    return NextResponse.json({result,success})
}