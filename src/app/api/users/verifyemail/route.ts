import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {
    
    try {
        const reqBody = await request.json();
        const {token} = reqBody
        console.log(token);

        const user = await User.findOne(
            {
                verifyToken: token,
                verifyTokenExpiry : {$gt: Date.now()}
            }
        )

        if(!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }

        console.log(user);

        user.isVerfied = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json(
            {
                message : "email verified successfully", 
                success : true
            }
        )

    }catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        return NextResponse.json(
            {error: errorMessage},
            {status: 500}
        )
    }
}