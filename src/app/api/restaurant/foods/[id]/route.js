import mongoose from "mongoose";
import { connectionURL } from "../../../../lib/db";
import { foodSchema } from "../../../../lib/foodsModel";
import { NextResponse } from "next/server";

export async function GET(request, content)
{
    const id = content.params.id
    // console.log(resto_id)
    let success = false;
    await mongoose.connect(connectionURL,{useNewUrlParser:true})
    let result = await foodSchema.find({resto_id:id})
    if(result)
        {
            success=true;
        }
    return NextResponse.json({result,success})
}

export async function DELETE(request,content)
{
    const id = content.params.id
    let success=false;
    await mongoose.connect(connectionURL,{useNewUrlParser:true})
    let result = await foodSchema.deleteOne({_id:id})
    if(result.deletedCount>0)
        {
            success=true;
        }
        return NextResponse.json({result,success})
}