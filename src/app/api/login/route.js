import UserSchema from "@/app/models/UserSchema";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import Jwt from "jsonwebtoken";
import Dbconnect from "@/app/libs/Dbconnect";
export const POST = async (req, res) => {
    const records = await req.json();
    let { email, password } = records;
    await Dbconnect()
    try {

        let user = await UserSchema.findOne({ email });
        if (!user) {
            return NextResponse.json({ "msg": "Invalid email id" })
        }
        let validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ "msg": 'invalid Password' })
        }

        let tokenData = {
            id: user._id,
            email: user.email,
            name:user.name
        }

        let token = Jwt.sign(tokenData, "fgfnjbngnbghngjf", { expiresIn: "1h" });
        const response = NextResponse.json({ "msg": "Login successfully" })
        response.cookies.set("token", token, { httpOnly: true })
        return response
    } catch (error) {
        return NextResponse.json({ "msg": "error.message" })
    }
}