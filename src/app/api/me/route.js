import { cookies } from "next/headers"; // Assuming you're using next-cookies for cookie handling
import JWT from "jsonwebtoken";
import NextResponse from 'next/server';

export const GET = async (req) => {
    let token = cookies(req).token; // Access token directly
    let user;

    if (token) {
        try {
            user = JWT.verify(token, "fgfnjbngnbghngjf");
            return NextResponse.json({ message: "Logged in", user: user, success: true, status: 200 });
        } catch (error) {
            return NextResponse.json({ message: "Invalid token", success: false, status: 401 });
        }
    } else {
        return NextResponse.json({ message: 'Token not found', success: false, status: 400 });
    }
};
