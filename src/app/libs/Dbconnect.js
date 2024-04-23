import mongoose from "mongoose";
const Dbconnect=async()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/bookstore")
        console.log("DB Connect")
    } catch (error) {
        console.log("Sorry Db not connected")
    }
}
export default Dbconnect;