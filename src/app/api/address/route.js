import Dbconnect from "@/app/libs/Dbconnect";
import JWT from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import Address from "@/app/models/Address";


export const GET=async(req,res)=>{
    await Dbconnect()
    let token = cookies(req).get("token");
 let user;
    user = JWT.verify(token.value, "fgfnjbngnbghngjf");
    let address=await Address.find({user:user.id})
return NextResponse.json({address});
}