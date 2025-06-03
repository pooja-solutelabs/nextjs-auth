import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";  //Library to hash and compare passwords securely.
import jwt from "jsonwebtoken";  //Library to generate and verify JWT tokens

connect()

export async function POST(request: NextRequest) {
    try{
        const reqBody = await request.json()
        const {email, password} = reqBody;
        console.log(reqBody);

        //check if user is exists
        const user = await User.findOne({email})
        if(!user) {
            return NextResponse.json({error: "user does not exist"}, {status: 400})
        }        
        //check if password is correct
        const validatePassword = await bcryptjs.compare
        (password, user.password)
        if(!validatePassword){
            return NextResponse.json({error:"Invalid password"}, {status:400})
        }

        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true,  //Protects the token from being stolen via JavaScript
        })
        return response;

    }catch (error: unknown){
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        return NextResponse.json({error: errorMessage},
            {status: 500}
            
        )
    }
}