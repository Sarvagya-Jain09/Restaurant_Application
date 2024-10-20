import mongoose from "mongoose";
import {connectionURL} from '../../../lib/db'
import {userSchema} from '../../../lib/usermodel' 
import { NextResponse } from "next/server";

export async function POST(request){
    let payload = await request.json();
    let success = false;
    await mongoose.connect(connectionURL,{useNewUrlParser : true})
    let data = await userSchema.findOne({email:payload.email,password:payload.password})
    if(data)
    {
        success=true;
    }
    return NextResponse.json({data,success})
}