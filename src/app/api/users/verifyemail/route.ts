import {connectDb} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server";

connectDb();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {token} = reqBody;

        console.log("Received token:", token);

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: {$gt: Date.now()}
        });

        if (!user) {
            return NextResponse.json(
                {error: "Invalid or expired token"},
                {status: 400}
            );
        }

        console.log("User found:", user);

        // If user is found and token matches, change field isVerified to true
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json(
            {message: "Email verified successfully", success: true}
        );

    } catch (error: any) {
        console.error("Error during user email verification:", error);
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        );
    }
}
