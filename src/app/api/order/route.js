import Dbconnect from "@/app/libs/Dbconnect";
import Order from "@/app/models/Order";
import OrderItem from "@/app/models/OrderItem";
import JWT from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const GET=async(req,res)=>{
    await Dbconnect()
    let token = cookies(req).get("token");

    if (!token) {
        return NextResponse.json({ 'message': "Token not found" },{ status: 400 });
    }

    let user;
    try {
        user = JWT.verify(token.value, "fgfnjbngnbghngjf");
    } catch (error) {
        console.error("JWT verification error:", error);
        return NextResponse.json({ 'message': "Invalid token" },{ status: 400 });
    }

    let order = await Order.findOne({ userId: user.id, ordered: false });
    if(!order){
        return NextResponse.json({msg:"order not found"}, {status:false})

    }
    let orderItem = await OrderItem.find({ userId: user.id, orderId: order._id }).populate('bookId');




    return NextResponse.json({orderItem});

   
}