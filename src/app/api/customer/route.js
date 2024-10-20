import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionURL } from "../../lib/db";
import { restaurantSchema } from "../../lib/restaurantModel";

export async function GET(request){
    let queryParam = request.nextUrl.searchParams
    // console.log(queryParam.get('location'))
    await mongoose.connect(connectionURL,{useNewUrlParser:true})
    let filter={}
    if(queryParam.get('location'))
    {
        let city = queryParam.get('location')
        filter = {city:{$regex:new RegExp(city,'i')}}    
    }
    else if(queryParam.get('restaurant'))
        {
            let name = queryParam.get('restaurant')
            filter = {name:{$regex:new RegExp(name,'i')}}  
        }
    let result = await restaurantSchema.find(filter)
    return NextResponse.json({result,success : true})
}