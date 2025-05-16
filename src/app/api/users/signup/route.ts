import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect()

export async function POST(request:NextRequest) {
    try{
        const reqBody = await request.json()
        const {username, email, password} = reqBody
        
        console.log(reqBody);

        //check if user is already exists
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User is already exists"}, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })

        const savedUser = await newUser.save();
        console.log(savedUser);

        return NextResponse.json({
            message: "User create Successfully",
            success: true,
            savedUser
        })

    }catch (error: unknown){
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        return NextResponse.json({error: errorMessage},
            {status: 500}
        )
    }
}
