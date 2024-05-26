import jwt from "jsonwebtoken";
import {NextRequest} from "next/server";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || ""
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!)

        // any hum n is liye kia h k abhi decodedToken ko pata nai h usky andr kia h
        // (TS issue)

        return decodedToken.id

    } catch (error: any) {
        throw new Error(error.message)
    }


}