import mongoose from "mongoose";
import { NextResponse } from "next/server";
import {connectionURL} from "../../../lib/db"
import {restaurantSchema} from "../../../lib/restaurantModel"


export async function GET()
{
    await mongoose.connect(connectionURL,{useNewUrlParser : true})
    let result = await restaurantSchema.find()
    // result = result.map((item)=> item.city.toLowerCase())
    result = result.map((item)=>item?.city?.charAt(0).toUpperCase() + item?.city?.slice(1))
    result = [...new Set(result.map((item)=>item))]
    return NextResponse.json({result,success:true})
}