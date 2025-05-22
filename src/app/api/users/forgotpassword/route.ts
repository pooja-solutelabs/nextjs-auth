import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";

connect();

export async function POST(request: NextRequest) {
    try{
        const reqBody = await request.json();
        const {email} = reqBody;

        //find user
        const user = await User.findOne({email})
        if(!user) {
            return NextResponse.json(
                { error : "User with this email does not exist" },
                { status: 404 }
            )
        }

        // Generate password reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        
        // Set token expiry (1 hour from now)
        const passwordResetExpires = new Date(Date.now() + 3600000);

         // Hash the token for security
         const passwordResetToken = crypto
         .createHash("sha256")
         .update(resetToken)
         .digest("hex");

        // Save to user model
        user.resetPasswordToken = passwordResetToken;
        user.resetPasswordExpires = passwordResetExpires;
        await user.save();

        // Create reset URL
        const resetUrl = `${process.env.DOMAIN}/resetpassword/${resetToken}`;

        // Create transporter
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: Number(process.env.MAILTRAP_PORT),
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS,
            },
        })

        // Send email
        const mailOptions = {
            from: "noreply@notetracker.com",
            to: user.email,
            subject: "Password Reset Request",
            html: `
                <h1>Password Reset</h1>
                <p>You requested a password reset for your account.</p>
                <p>Click <a href="${resetUrl}">here</a> to reset your password, or copy and paste the following URL into your browser:</p>
                <p>${resetUrl}</p>
                <p>This link will expire in 1 hour.</p>
                <p>If you didn't request this, please ignore this email.</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: "Password reset email sent" },
            { status: 200 }
        );

        
    }catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An error occurred";
        console.error("Forgot password error:", error);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}