import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    land: {
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
       
    },

   

    type:{
        type:String,
        required:true,
        default:"home"

    }

},);

export default mongoose.models.AddressUser || mongoose.model("AddressUser", AddressSchema);
