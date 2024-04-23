"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';

function PaymentPageCom() {
    const [orderItems, setOrderItems] = useState([]);
    const [orderData, setOrderData] = useState([]);

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

    const makePayment = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/order/payment", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json' // Specify content type if necessary
                }
            });
            if (!response.ok) {
                throw new Error('Failed to make payment');
            }
            const order = await response.json();
            setOrderData(order);
            alert(`Your payment has been made successfully!`);
        } catch (error) {
            console.error('Failed to make payment:', error);
            // Handle error appropriately, e.g., show error message to the user
        }
    };

    return (
        <>
            {
                orderData.length == 0 && <>
                    <div className="flex flex-col items-center justify-center my-8">
                        <h1 className='text-3xl font-semibold mb-4'>Make Payment</h1>
                        <div className="w-full max-w-xs">
                            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold">Total payable amount: ${totalPayAmonut.toFixed(2)}</h3>
                                </div>
                                <div className="flex justify-center mb-4">
                                    <div className="w-full">
                                        <h2 className='text-lg my-2 font-semibold'>Select Payment Mode</h2>
                                        <button onClick={makePayment} className='w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2'>Cash On Delivery</button>
                                        <button disabled className='w-full bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded cursor-not-allowed'>Pay Online</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }

            {
                orderData.length != 0 && <>
                    <div className='flex flex-col items-center justify-center my-8'>
                        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <div className="text-3xl text-green-600 mb-3 font-semibold text-center">Wow!</div>
                            <div className="text-lg font-medium text-center mb-3">Your Order Placed Successfully!</div>
                            <Link href={'/myorder'} className='bg-rose-600 self-center font-medium text-white px-3 py-1 rounded-sm'>My Order</Link>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default PaymentPageCom;
