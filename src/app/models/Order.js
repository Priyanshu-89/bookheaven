import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    ordered: {
        type: Boolean,
        default: false
    },
    address:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"AddressUser",
        default:null
    },

    orderItems: [{ // Define orderItems as an array of objects
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderItem" // Reference to OrderItem model
    }]
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
