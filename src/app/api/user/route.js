import mongoose from "mongoose";
import {connectionURL} from '../../lib/db'
import {userSchema} from '../../lib/usermodel'
import { NextResponse } from "next/server";

export async function POST(request)
{
    let payload = await request.json();
    let success = false;
    await mongoose.connect(connectionURL,{useNewUrlParser:true})
    let final = new userSchema(payload)
    let data = await final.save()
    if(data)
        {
            success = true;
        }
    return NextResponse.json({data,success})
}