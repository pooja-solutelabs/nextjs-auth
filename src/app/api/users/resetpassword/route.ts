import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs"; // Added bcrypt import

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token, password } = reqBody;

        // Hash the received token to compare with stored hash
        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        // Find user with this token and check if token is still valid
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json(
                { error: "Invalid or expired password reset token" },
                { status: 400 }
            );
        }

        // Hash the new password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update user with new password
        user.password = hashedPassword; 
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        return NextResponse.json(
            { message: "Password has been reset successfully" },
            { status: 200 }
        );
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An error occurred";
        console.error("Reset password error:", error);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}