import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        // Parse request body
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        console.log("Received request body:", reqBody);

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        console.log("User saved successfully:", savedUser);

        // Respond with success message
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            user: {
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email,
            },
        });
    } catch (error: any) {
        console.error("Error creating user:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
