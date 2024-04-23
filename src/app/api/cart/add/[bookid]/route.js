import BookSchema from "@/app/models/BookSchema";
import Order from "@/app/models/Order";
import OrderItem from "@/app/models/OrderItem";
import JWT from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
   
        const { bookid } = params;

      
        const book = await BookSchema.findById(bookid);

        if (!book) {
                       return NextResponse.json({ 'message': "Book not found" }, { status: 404 });
                }

                
     const token = cookies(req.headers).get("token");

 
       if (!token) {
           return NextResponse.json({ 'message': "Token not found" }, { status: 401 });
        }

        // Verify the user's token
        let user;
        try {
            user = JWT.verify(token.value, "fgfnjbngnbghngjf");
        } catch (error) {
            
            return NextResponse.json({ 'message': "Invalid token" }, { status: 401 });
        }

                // Find or create the user's order
         let order = await Order.findOne({ userId: user.id, ordered: false });
         if (!order) {
                        order = await Order.create({ userId: user.id, ordered: false });
                    }


                      // Find or create the order item for the book
        let orderItem = await OrderItem.findOne({ userId: user.id, bookId: book._id, orderId: order._id });

        if (!orderItem) {
            orderItem = await OrderItem.create({ userId: user.id, bookId: book._id, orderId: order._id, quantity: 1 });
        } else {
            orderItem = await OrderItem.findOneAndUpdate(
                { userId: user.id, bookId: book._id, orderId: order._id },
                { $inc: { quantity: 1 } }
            );
        }

    
    return NextResponse.json({"message":"Book has been added successfully"}, {status:200});
}

       
//       

//         // Get the user's token from cookies
//         const token = cookies(req.headers).get("token");

//         // Check if the token exists
//         if (!token) {
//             return NextResponse.json({ 'message': "Token not found" }, { status: 401 });
//         }

//         // Verify the user's token
//         let user;
//         try {
//             user = JWT.verify(token, "fgfnjbngnbghngjf");
//         } catch (error) {
//             console.error("JWT verification error:", error);
//             return NextResponse.json({ 'message': "Invalid token" }, { status: 401 });
//         }

//         // Find or create the user's order
//         let order = await Order.findOne({ userId: user.id, ordered: false });

//         if (!order) {
//             order = await Order.create({ userId: user.id, ordered: false });
//         }
        
//         // Find or create the order item for the book
//         let orderItem = await OrderItem.findOne({ userId: user.id, bookId: book._id, orderId: order._id });

//         if (!orderItem) {
//             orderItem = await OrderItem.create({ userId: user.id, bookId: book._id, orderId: order._id, quantity: 1 });
//         } else {
//             orderItem = await OrderItem.findOneAndUpdate(
//                 { userId: user.id, bookId: book._id, orderId: order._id },
//                 { $inc: { quantity: 1 } }
//             );
//         }

//         return NextResponse.json({ 'message': "Book has been added successfully", book }, { status: 200 });
//     } catch (error) {
//         console.error("Error processing request:", error);
//         return NextResponse.json({ 'message': "Failed to add book to cart. Please try again." }, { status: 500 });
//     }
// };
