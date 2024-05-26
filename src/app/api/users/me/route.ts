import {connectDb} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import {getDataFromToken} from "@/helper/getDataFromToken";

connectDb();

export async function POST(request: NextRequest) {
    // extract data from token
    const userId = await getDataFromToken(request)
    console.log("userId", userId)

    const user = await User.findOne({_id: userId}).select("-password")

    // check if there is user
    return NextResponse.json({
        message: "User found",
        data: user
    })


}