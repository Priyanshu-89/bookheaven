"use server"

import { redirect } from "next/navigation";
import Dbconnect from "../libs/Dbconnect"
import bcrypt from "bcryptjs";
import UserSchema from "../models/UserSchema";

export const CreateAccount=async(formData)=>{
await Dbconnect()

let { name, email, password, contact } = formData;
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

let records={name, email, password:hashedPassword, contact};
let data=await UserSchema.create(records);
redirect('/')
}
  