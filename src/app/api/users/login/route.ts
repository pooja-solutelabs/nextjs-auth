import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

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

    }catch (error: any){
        return NextResponse.json({error: error.message},
            {status: 500}
            
        )
    }
}