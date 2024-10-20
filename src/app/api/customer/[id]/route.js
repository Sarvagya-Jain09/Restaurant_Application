import mongoose from "mongoose"
import { NextResponse } from "next/server"
import {connectionURL} from "../../../lib/db"
import {restaurantSchema} from '../../../lib/restaurantModel'
import {foodSchema} from '../../../lib/foodsModel'

export async function GET(request,content)
{
    let id = content.params.id;
    // let success = false;
    await mongoose.connect(connectionURL,{useNewUrlParser : true})
    let details = await restaurantSchema.findOne({_id:id})
    let foodItems = await foodSchema.find({resto_id:id})
    return NextResponse.json({success:true,details,foodItems})
}