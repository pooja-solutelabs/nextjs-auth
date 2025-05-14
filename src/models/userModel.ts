import { Verify } from "crypto";
import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please Provide Username"],
        unique: true,
    },
    email:{
        type: String,
        required: [true, "Please Provide Email"],
        unique: true,
    },
    password:{
        type: String,
        required: [true, "Please Provide Password"],
    },
    isVerfied:{
        type: Boolean,
        default: false,
    },
    isAdmin:{
        type: String,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    VerifyToken: String,
    VerifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model
("users", userSchema);

export default User;