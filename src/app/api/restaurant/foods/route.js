import mongoose from "mongoose"
import { foodSchema } from "../../../lib/foodsModel"
import { NextResponse } from "next/server"
import { connectionURL } from "../../../lib/db"

export async function POST(request){
    let payload = await request.json()
    let success=false;
    await mongoose.connect(connectionURL,{useNewUrlParser:true})
    const food = new foodSchema(payload)
    const result = await food.save()
    if(result)
        {
            success=true;
        }
    return NextResponse.json({result,success})
}