'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';

function CartPage() {
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const orderData = await fetch('http://localhost:3000/api/order', { cache: "no-cache" });
                if (!orderData.ok) {
                    throw new Error('Failed to fetch data');
                }
                const res = await orderData.json();
                setOrderItems(res.orderItem);
            } catch (err) {
                console.log('Failed to load cart details:', err);
            }
        };
        fetchData();
    }, []);



    const handleIncrease = (id) => {
        const updatedItems = orderItems.map(item => {
            if (item.bookId._id === id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setOrderItems(updatedItems);
    }

    const handleDecrease = (id) => {
        const updatedItems = orderItems.map(item => {
            if (item.bookId._id === id && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });

        // Filter out items with quantity less than 1
        const filteredItems = updatedItems.filter(item => item.quantity >= 1);

        setOrderItems(filteredItems);
    }


    const calculateItemTotal = (item) => {
        return item.quantity * item.bookId.price;
    }

    // Function to calculate total price of all items
    const calculateTotalPrice = () => {
        return orderItems.reduce((total, item) => total + calculateItemTotal(item), 0);
    }

    const calculateTotalDiscount = () => {
        return orderItems.reduce((total, item) => total + ((item.bookId.price - item.bookId.discountPrice) * item.quantity), 0);
    }

    const totalOriginalPrice = calculateTotalPrice(); // Calculate the total original price
    const totalDiscountedPrice = calculateTotalDiscount(); // Calculate the total discounted price

    // Calculate the total discount by subtracting the total discounted price from the total original price
    const totalDiscount = totalOriginalPrice - totalDiscountedPrice;
    const texAmount = totalDiscountedPrice * 0.18;
    const totalPayAmonut = texAmount + totalDiscountedPrice;
    return (
        <div className='flex w-[100%]'>
            {/* <div className='flex flex-1 mt-4 mb-3 '>
                <h1 className='text-2xl font-semibold text-cyan-600 underline'>Your Shopping Cart {(orderItems.length)}</h1>
            </div> */}
            <div className='flex flex-wrap gap-3 justify-around w-[70%]'>
                {orderItems.map((orderItem, index) => (
                    <div key={index} className="w-[25%] h-[30%] border border-green-500">
                        <div className="bg-white rounded flex flex-col items-center justify-center p-3">
                            <div className="w-full h-48">
                                <img className='w-full h-48 object-top' src={`/bookImage/${orderItem.bookId.coverImage}`} alt="" />
                            </div>
                            <div className="w-full p-4 border">
                                <div className="flex flex-col">
                                    <h2 className='text-xl font-semibold'>Title:{orderItem.bookId.title}</h2>
                                    <h3 className='text-sm font-medium font-serif'>{orderItem.bookId.catTitle}</h3>
                                    <h3 className='text-sm font-medium font-serif'>Author:{orderItem.bookId.author}</h3>
                                    <h3 className='text-sm font-medium font-serif'> Price: ₹{orderItem.bookId.discountPrice} <del className='text-slate-400'>₹{orderItem.bookId.price}</del></h3>
                                    <div className="flex flex-1 mt-2">
                                        <button type='button' onClick={() => handleDecrease(orderItem.bookId._id)} className='bg-red-400 text-white px-2  text-xl rounded-lg'>-</button>
                                        <span className='px-3 py-1 text-xl'>Quantity:{orderItem.quantity > 1 ? '+' : ''}{orderItem.quantity}</span>
                                        <button type='button' onClick={() => handleIncrease(orderItem.bookId._id)} className='bg-green-400 text-white px-2 text-xl rounded-lg'>+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                  </div>
                <div className="w-[30%]">
                    <div className="shadow-lg bg-white rounded flex flex-col p-4">
                        <h2 className='text-center text-lg font-semibold font-serif tracking-tight'>Price Details</h2>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between  bg-rose-500 px-2 py-1 text-rose-50 rounded-sm">
                                <h3 className="text-sm font-medium font-serif">Total Price:</h3>
                                <h3 className="text-sm font-medium font-serif"> ₹{totalOriginalPrice.toFixed(2)}</h3>
                            </div>
                            <div className="flex justify-between  bg-green-500 px-2 py-1 text-green-50 rounded-sm">
                                <h3 className="text-sm font-medium font-serif ">Total Discount:</h3>
                                <h3 className="text-sm font-medium font-serif">₹{totalDiscount.toFixed(2)}</h3>
                            </div>

                            <div className="flex justify-between bg-orange-500 px-2 py-1 text-orange-50 rounded-sm">
                                <h3 className="text-sm font-medium font-serif">Tex Discount (GST 18%):</h3>
                                <h3 className="text-sm font-medium font-serif">₹{texAmount.toFixed(2)}</h3>
                            </div>

                            <div className="flex justify-between">
                                <h3 className="text-lg font-semibold font-serif">Total Payable Amount :</h3>
                                <h3 className="text-lg font-semibold font-serif">₹{totalPayAmonut.toFixed(2)}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 justify-between mt-2">
                        <Link href={"/"} className='bg-blue-500 text-white px-3 py-2 rounded-md'>More Shopping</Link>
                        <Link href={"/checkout"} className='bg-green-500 text-white px-3 py-2 rounded-md'>Checkout</Link>
                    </div>
                </div>
          
        </div>
    );
}

export default CartPage;
