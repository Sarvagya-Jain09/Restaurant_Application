import mongoose from "mongoose"
import { connectionURL } from "../../../lib/db"
import { deliveryPartnerSchema } from "../../../lib/deliveryModel";
import { NextResponse } from "next/server";

export async function POST(request)
{
    let payload = await request.json()
    await mongoose.connect(connectionURL,{useNewUrlParser:true})
    let success = false;
    let result = await deliveryPartnerSchema.findOne({contact : payload.loginMobile,password : payload.loginPassword})
    if(result)
    {
        success=true;
    }
    return NextResponse.json({result,success})
}