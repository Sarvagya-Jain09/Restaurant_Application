import mongoose from "mongoose";
import {connectionURL} from "../../../../../lib/db"
import {foodSchema} from "../../../../../lib/foodsModel"
import { NextResponse } from "next/server";

export async function GET(request,content)
{
    let food_id = content.params.id;
    let success = false;
    await mongoose.connect(connectionURL,{useNewUrlParser : true})
    let result = await foodSchema.findOne({_id : food_id})
    if(result)
    {
        success=true;
    }
    return NextResponse.json({result,success})
}
export async function PUT(request,content)
{
    let id = content.params.id;
    let success = false;
    let payload = await request.json()
    await mongoose.connect(connectionURL,{useNewUrlParser:true})
    let result = await foodSchema.findOneAndUpdate({_id:id},payload)
    if(result)
        {
            success=true;
        }
    return NextResponse.json({result,success})
}