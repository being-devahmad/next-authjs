import {connectDb} from "@/dbConfig/dbConfig";
import {NextRequest, NextResponse} from "next/server";

connectDb();

export async function GET(request: NextRequest) {
    try {
        const response = NextResponse.json(
            {message: "Logout successfully", success: true})

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })
        return response


    } catch (error: any) {
        console.error("Error during logout:", error);
        return NextResponse.json(
            {error: error.message},
            {status: 500})
    }
}