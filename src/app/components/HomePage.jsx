'use client'
import React, { useState } from 'react'
import CategoryBadges from './CategoryBadges'
import BookCard from './BookCard'

const HomePage = ({ callBooks, callCategory }) => {
  const [searchOne, setSearchOne] = useState("");
  const filterBook = callBooks.filter((book) =>
    book.title.toLowerCase().includes(searchOne.toLowerCase())
  )
  return (
    <>
      <div className="flex items-center justify-center w-full overflow-hidden  bg-slate-300 flex-col">

        <div className='relative flex flex-col items-center justify-center w-full h-[70vh]' style={{ backgroundImage: `url('/bookImage/cover.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-40"></div>

          {/* Content */}
          <div className="relative z-10">
            <h1 className='text-3xl font-semibold font-serif text-slate-100 mb-3'>Find Your Favt Books</h1>
            <div className="w-full flex flex-col gap-3">
              <input onChange={(e) => setSearchOne(e.target.value)} value={searchOne} type="search" className='border px-4 py-2' placeholder='Search by title, author, category' />
              {/* <div className='flex gap-1 item-center justify-center'>
    <button type="submit" value="Search Book" className='px-8 py-2 bg-cyan-500 text-cyan-50 rounded-md mb-4 text-lg cursor-pointer hover:bg-cyan-400 flex items-center'>
        Search Book 
        <span className="ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        </span>
    </button>
</div> */}

            </div>
          </div>
        </div>

        <div className='px-[10%] mt-4 w-full'>
          <CategoryBadges data={callCategory} />
          <div className="flex-1 flex mt-5">
            <div className="font-bold">Latest Books({filterBook.length})</div>
          </div>
          <div className="grid grid-cols-3 gap-4 w-full  mt-5">
            {filterBook.map((book, i) => <BookCard key={i} book={book} />)}
          </div>
        </div>









      </div >
    </>
  )
}

export default HomePage
