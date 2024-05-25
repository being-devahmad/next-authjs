import {connectDb} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs";
import {sendEmail} from "@/helper/mailer";

connectDb();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        // Validation
        if (!username || !email || !password) {
            return NextResponse.json(
                {error: "Missing required fields"},
                {status: 400}
            );
        }

        console.log(reqBody);

        const user = await User.findOne({email});
        if (user) {
            return NextResponse.json(
                {error: "User already exists"},
                {status: 400}
            );
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        // Send verification email
        await sendEmail({
            email,
            emailType: "VERIFY",
            userId: savedUser._id,
        });

        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            user: savedUser,
        });

    } catch (error: any) {
        console.error("Error during user signup:", error);
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        );
    }
}
