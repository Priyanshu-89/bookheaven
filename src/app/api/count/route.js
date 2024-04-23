import Dbconnect from "@/app/libs/Dbconnect";
import BookSchema from "@/app/models/BookSchema";
import Category from "@/app/models/Category";
import Order from "@/app/models/Order";
import UserSchema from "@/app/models/UserSchema";
import {NextResponse} from 'next/server'

export async function GET(req){
    await Dbconnect()
    let bookCount =await BookSchema.countDocuments();
    let userCount=await UserSchema.countDocuments();
    let orderCount=await Order.countDocuments();
    let categoryCount=await Category.countDocuments()

    return NextResponse.json({bookCount, userCount, orderCount, categoryCount})
}
