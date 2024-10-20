import mongoose from "mongoose"
import { NextResponse } from "next/server"
import { connectionURL } from "../../lib/db"
import { restaurantSchema } from "../../lib/restaurantModel"

export async function GET()
{
    await mongoose.connect(connectionURL,{useNewUrlParser:true})
    const data = await restaurantSchema.find();
    // console.log(data)
    return NextResponse.json({return : data})
}

export async function POST(request)
{
    await mongoose.connect(connectionURL,{useNewUrlParser:true})
    let payload = await request.json()
    let data;
    let success= false;
    if(payload.login)
    {
        data = await restaurantSchema.findOne({email:payload.email,password:payload.password})
        if(data)
        {
            success=true;    
        }
    }
    else{
        let final_data = new restaurantSchema(payload)
        data = await final_data.save()
        if(data)
        {
            success=true;    
        }
    }

    return NextResponse.json({data,success})
}