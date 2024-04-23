"use client"

import Image from 'next/image'
import Link from 'next/link'


function ViewBook({ book }) {
   
 const handleAddButton=async()=>{
    let data =await fetch(`http://localhost:3000/api/cart/add/${book._id}`)
    let res= await data.json();
    if(!res){
        alert("Not")
    }
 }

    
    
    return (
        <div>
            <div className="flex max-w-4xl pt-4 mx-auto flex-col">
                <div className="flex gap-5 items-center w-5xl p-4 border border-slate-300 shadow-md">
                    <Image src={`/bookImage/${book.coverImage}`} width={500} height={300} alt='loading' className='w-96 h-96 rounded-md border-2 border-b-slate-400' />
                    <div className="flex flex-col gap-1 items-center">
                        <h2 className='text-xl font-semibold text-slate-700'>{book.title}</h2>
                        <p className='text-base text-slate-600'>Author: {book.author}</p>
                        <h4 className='text-base text-slate-600 my-2'><p className='font-semibold'>Description:</p>{book.description}</h4>
                        <p className='text-lg font-semibold'>Discount Price: ₹{book.discountPrice}/- MRP:<del className='text-slate-600'>₹{book.price}</del></p>
                        <div className='flex gap-2 w-full items-center justify-around mt-4'>
                            <Link href={"#"} className='bg-orange-700 px-8 py-2 rounded-md text-slate-100 flex gap-2'>
                                <span>  Buy Now </span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </Link>
                          <Link href={'/cart'}>
                          <button type='button' onClick={handleAddButton}  className='bg-cyan-700 px-8 py-2 rounded-md text-slate-100 flex gap-2'>
                              Add to Cart
                            </button>
                          </Link>
                        </div>
                      
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewBook;
