


'use client'
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { handleAddress } from '../actions/AddressAction';

function Checkout() {
    const [orderItems, setOrderItems] = useState([]);
    const [addressFilled, setAddressFilled] = useState(false); // Track whether address details are filled

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (formData) => {
        try {
            await handleAddress(formData);
            setAddressFilled(true); // Set addressFilled to true after successful submission
            reset();
        } catch (error) {
            console.error('Error handling address:', error);
        }
    };

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

    // Function to calculate total discount
    const calculateTotalDiscount = () => {
        return orderItems?.length > 0 ? orderItems.reduce((total, item) => total + ((item.bookId.price - item.bookId.discountPrice) * item.quantity), 0) : 0;
    }

    const totalDiscountedPrice = calculateTotalDiscount(); // Calculate the total discounted price
    const texAmount = totalDiscountedPrice * 0.18;
    const totalPayAmount = texAmount + totalDiscountedPrice;

    // Function to handle form submission
    const handleFormSubmit = async (formData) => {
        try {
            await handleAddress(formData);
            setAddressFilled(true); // Set addressFilled to true after successful submission
            reset();
        } catch (error) {
            console.error('Error handling address:', error);
        }
    };

    return (
        <>
            <div className='flex flex-1 mt-4 mb-4 justify-center'>
                <h1 className='text-3xl font-semibold  underline'>Order information</h1>
            </div>

            <div className="flex justify-around">
                <div className='w-2/6'>
                    {/* Display order items */}
                    {orderItems.map((orderItem, index) => (
                        <div key={index} className="flex flex-col">
                            <div className="bg-white rounded flex flex-col items-center justify-center p-3">
                                <div className="w-full p-4 border">
                                    <div className="flex flex-col gap-1">
                                        <h2 className='text-xl font-semibold'>{index + 1}. {orderItem.bookId.title}</h2>
                                        <div className='flex gap-1'>
                                            <span className='text-sm font-medium font-serif'>Qty: {orderItem.quantity} x</span>
                                            <span className='text-sm font-medium font-serif'> {orderItem.bookId.discountPrice}=</span> <span>{orderItem.bookId.discountPrice * orderItem.quantity}</span>
                                            <del className='text-slate-400'>₹{orderItem.bookId.price}</del>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="shadow bg-white rounded flex flex-col p-4 h-36 w-[40%]">
                    {/* Price details */}
                    <h2 className='text-center text-lg font-semibold font-serif tracking-tight'>Price Details</h2>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <h3 className="text-lg font-semibold font-serif">Total Payable Amount :</h3>
                            <h3 className="text-lg font-semibold font-serif">₹{totalPayAmount.toFixed(2)}</h3>
                        </div>
                    </div>
                    {/* Conditionally render Make Payment button based on addressFilled */}
                    <div className="flex gap-4 justify-between mt-2">
                        {addressFilled ? (
                            <Link href={"/payment"} className='bg-green-500 text-white px-3 py-2 rounded-md'>Make Payment</Link>
                        ) : (
                            <button disabled className='bg-gray-300 text-gray-700 px-3 py-2 rounded-md cursor-not-allowed'>Make Payment</button>
                        )}
                    </div>
                    {/* Address form */}
                    <div className='flex flex-col mt-6 shadow-lg rounded border border-gray-300'>
                        <h2 className="text-lg font-semibold p-2">Enter Delivery Address Details</h2>
                        <div className="p-4">
                            <form onSubmit={handleSubmit(handleFormSubmit)} autoComplete='off'className='flex flex-col w-full'>
                            
                                    <fieldset className='flex flex-col'>
                                        <label htmlFor="name" className="mb-2">Enter Name:</label>
                                        <input {...register('name', { required: 'Name is required' })} type="text" placeholder="Enter Your Name" className="px-3 py-2 border rounded-md mb-3 focus:outline-none focus:ring focus:border-blue-500" />
                                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                                    </fieldset>
                                    <fieldset className='flex flex-col'>
                                        <label htmlFor="land" className="mb-2">Enter Landmark:</label>
                                        <input {...register('land')} type="text" placeholder="Enter Landmark" className="px-3 py-2 border rounded-md mb-3 focus:outline-none focus:ring focus:border-blue-500" />
                                    </fieldset>
                                    <fieldset className='flex flex-col'>
                                        <label htmlFor="contact" className="mb-2">Contact Details:</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <input {...register('contact')} type="text" placeholder="Street/Village/Area" className="px-3 py-2 border rounded-md mb-3 focus:outline-none focus:ring focus:border-blue-500" />
                                            <select {...register('state')} className="px-3 py-2 border rounded-md mb-3 focus:outline-none focus:ring focus:border-blue-500">
                                                <option value="" disabled selected>Select State</option>
                                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                                <option value="Assam">Assam</option>
                                                <option value="Bihar">Bihar</option>
                                                <option value="Chhattisgarh">Chhattisgarh</option>
                                                <option value="Goa">Goa</option>
                                                <option value="Gujarat">Gujarat</option>
                                                <option value="Haryana">Haryana</option>
                                                <option value="Himachal Pradesh">Himachal Pradesh</option>
                                                <option value="Jharkhand">Jharkhand</option>
                                                <option value="Karnataka">Karnataka</option>
                                                <option value="Kerala">Kerala</option>
                                                <option value="Madhya Pradesh">Madhya Pradesh</option>
                                                <option value="Maharashtra">Maharashtra</option>
                                                <option value="Manipur">Manipur</option>
                                                <option value="Meghalaya">Meghalaya</option>
                                                <option value="Mizoram">Mizoram</option>
                                                <option value="Nagaland">Nagaland</option>
                                                <option value="Odisha">Odisha</option>
                                                <option value="Punjab">Punjab</option>
                                                <option value="Rajasthan">Rajasthan</option>
                                                <option value="Sikkim">Sikkim</option>
                                                <option value="Tamil Nadu">Tamil Nadu</option>
                                                <option value="Telangana">Telangana</option>
                                                <option value="Tripura">Tripura</option>
                                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                                <option value="Uttarakhand">Uttarakhand</option>
                                                <option value="West Bengal">West Bengal</option>
                                            </select>
                                            <input {...register('city')} type="text" placeholder="City" className="px-3 py-2 border rounded-md mb-3 focus:outline-none focus:ring focus:border-blue-500" />
                                            <input {...register('pincode')} type="text" placeholder="Pincode" className="px-3 py-2 border rounded-md mb-3 focus:outline-none focus:ring focus:border-blue-500" />
                                        </div>
                                        <div className='flex justify-around'>
                                            <button type="reset" className='bg-cyan-50 px-8 py-1 rounded-md text-lg font-serif text-cyan-900 font-semibold'>Clear Form</button>
                                            <button type="submit" className='bg-cyan-700 px-8 py-1 rounded-md text-lg font-serif text-cyan-100 font-semibold'>Save Address</button>
                                        </div>
                                    </fieldset>
                               
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Checkout;
