import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        // Check if user already exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }
        // Check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }
        //create token data
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username,
        };
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1d",
        });

        const response = NextResponse.json({
            message: "Login successful",
            success: true
        });

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;


    } catch (error: any) {
        console.error("Error creating user:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

