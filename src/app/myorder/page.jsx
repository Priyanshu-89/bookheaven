import React from 'react';
import Order from '../models/Order';
import OrderItem from '../models/OrderItem';
import JWT from 'jsonwebtoken';
import { cookies } from 'next/headers';

const MyOrder = async () => {
    try {
        const token = cookies().get('token');

        if (!token || !token.value) {
            throw new Error('Token not found or invalid');
        }

        const user = JWT.verify(token.value, 'fgfnjbngnbghngjf');
        const orders = await Order.find({ userId: user.id, ordered: true });
        // console.log("Order is", orders)

        async function getOrderItems(id) {
            try {
                // Find OrderItems with the specified OrderId and populate the bookId field
                const orderItems = await OrderItem.find({ orderId: id }).populate("bookId");
        
                
        
                return orderItems; // Return the retrieved order items
            } catch (error) {
                // If an error occurs during the query, log the error and return an empty array
                console.error("Error fetching OrderItems:", error);
                return [];
            }
        }

        return (
            <div className='flex px-[10%] mt-5 flex-col w-full mx-auto'>
                <h1 className='text-3xl font-semibold text-cyan-600 mb-5'>MyOrder</h1>
               {orders.length >0 &&  <div className='flex'>
                    
                    <div className=' grid grid-cols-2 gap-3 w-full mx-auto'>
                        {
                            orders.map(async(order, i)=>{
                               let io=await getOrderItems(order._id)
                            //   console.log("Irboevd", io)

                                return (
                                    <div key={i} className='mb-3 border border-slate-700'>
                                    <div className='bg-slate-100 p-4'>
                                            <div className="flex justify-between">
                                                {/* <span>order Id:{order._id}</span> */}
                                                <span>Ordered:{order.orderDate.toLocaleString()}</span>
                                            </div>
                                    </div>
                                    <div key={i} className='bg-slate-100 border rounded flex p-4 max-w-3xl mx-auto'>
                                        <div className="w-1/2">
                                            {/* <img className='w-1/2 h-[100px] object-cover' src={`bookImage/${item.bookId.coverImage}`} alt="" /> */}
                                            <div className="w-10/12">
                                              {
                                               io.map((item, j)=>(
                                                    <div key={j} className="bg-white border w-full rounded flex p-4 justify-between">
                                                        <div className="w-1/3">
                                                            <img src={`bookImage/${item.bookId.coverImage}`} alt="" className='w-full h-[100px] object-cover'/>
                                                        </div>
                                                            <div className="w-[65%] py-2">
                                                                    <p>Title{item.bookId.title}</p>
                                                                    <span className='font-bold py-2'>₹{item.bookId.discountPrice}</span>
                                                                    <del>₹{item.bookId.price}</del>
                                                            </div>
                                                    </div>
                                                ))
                                              }
                                            </div>
                                        </div>

                                    </div>
                                    {/* <div className='bg-slate-100 p-4'>
                                            <div className="flex justify-between">
                                                <span>Total Amount:{order.price}</span>
                                                <span>Sattus:{order.ordered}</span>
                                            </div>
                                    </div> */}
                                    </div>
                                
                                )
                            })
                        }
                    </div>
                </div>}
                {
                   orders.length < 1 && <h1 className='text-center text-3xl text-red-600 font-bold'>No Order Found</h1>

                }
            </div>
        );
    } catch (error) {
        console.error('Error:', error.message);
        // Handle the error or return an error message component
        return <div>Error: {error.message}</div>;
    }
};

export default MyOrder;
