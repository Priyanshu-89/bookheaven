import mongoose from "mongoose";
import Category from "./Category";
const bookSchema =new mongoose.Schema({
title:{
    type:String,
    required:true
},

author:{
    type:String,
    required:true
},

description:{
    type:String,
    required:true
},

category:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'Category',  //referencing the category model
},

price:{
    type:Number,
    required: true,
},

discountPrice:{
    type:Number,
    
},

status:{
    type:Boolean,
    default:""
},

coverImage:{
    type:String,
    default:true
}


},)

export default mongoose.models.Book || mongoose.model("Book", bookSchema)