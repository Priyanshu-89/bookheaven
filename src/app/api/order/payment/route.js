import mongoose from 'mongoose';
import Dbconnect from "@/app/libs/Dbconnect";
import Order from "@/app/models/Order";
import JWT from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const PUT = async (req) => {
    try {
        await Dbconnect();
        const token = cookies(req).get("token");
        const user = JWT.verify(token.value, "fgfnjbngnbghngjf");

        const order = await Order.findOneAndUpdate({ userId: user.id, ordered: false }, { ordered: true });

        if (!order) {
            return NextResponse.json({ msg: "Order not found" }, { status: 400 });
        }

        return NextResponse.json({ order });
    } catch (error) {
        console.error('Error processing payment:', error);
        return NextResponse.error(new Error('Failed to process payment'), { status: 500 });
    }
};
