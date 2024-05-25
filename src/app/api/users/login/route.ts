import {connectDb} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connectDb();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;

        // Validation
        if (!email || !password) {
            return NextResponse.json(
                {message: "Missing required fields"},
                {status: 400}
            );
        }
        console.log(reqBody);

        const user = await User.findOne({email})

        if (!user) {
            return NextResponse.json(
                {message: "User does not exists"},
                {status: 400}
            );
        }

        console.log(user)

        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json(
                {error: "Check your credentials"},
                {status: 400})
        }

        // generate a token using jwt

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(
            tokenData,
            process.env.TOKEN_SECRET!,
            {expiresIn: '1d'}
        )

        const response = NextResponse.json({
            message: "Login successfully",
            success: true
        })
        response.cookies.set("token", token, {
            httpOnly: true
        })
        return response


    } catch (error: any) {
        console.error("Error during user login:", error);
        return NextResponse.json(
            {error: error.message},
            {status: 500})
    }
}