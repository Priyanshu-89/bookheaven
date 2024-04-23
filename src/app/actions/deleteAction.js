
"use server"
import { redirect } from "next/navigation";
import BookSchema from "../models/BookSchema"
import Dbconnect from "../libs/Dbconnect";




export const handleBookDelete=async(id)=>{
await Dbconnect();
    let data=await BookSchema.findByIdAndDelete(id);
    console.log(data)
    redirect("/admin/books")
   

}




