// import Image from "next/image";

// const BookCard = ({ book }) => {
//     return (
//         <div className="grid grid-cols-4 gap-5 w-[95vw]  mx-auto overflow-hidden">
//             { book.map((book, i) => (
//                 <div key={book._id} className="w-96 h-auto border border-slate-300 shadow-lg rounded-md overflow-hidden p-3">
//                     <div className="relative w-full h-80">
//                         <Image src={`/bookImage/${book.coverImage}`} layout="fill"  alt='loading' className='rounded-t-md' />
//                     </div>
//                     <div className="p-4">
//                         <h2 className='text-lg font-semibold text-slate-700'>{book.title}</h2>
//                         <p className='text-base text-slate-600'>Author: {book.author}</p>
//                         <p className='text-sm'>Discount Price: ₹{book.discountPrice} <del className='text-slate-600'>₹{book.price}</del></p>
//                         <a href={`/view/${book._id}`} className='block bg-slate-700 px-8 py-2 mt-2 rounded-md text-slate-100 text-center'>Know More</a>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     )
// }

// export default BookCard;


import Image from "next/image";

const BookCard = ({ book }) => {
    // Check if book is an array
    if (!Array.isArray(book)) {
        // If book is not an array, render a single book card
        return (
            <div className="grid grid-cols-4 gap-5 w-[95vw] mx-auto overflow-hidden">
                <div key={book._id} className="w-96 h-auto border border-slate-300 shadow-lg rounded-md overflow-hidden p-3">
                    <div className="relative w-full h-80">
                        <Image src={`/bookImage/${book.coverImage}`} layout="fill" alt='loading' className='rounded-t-md' />
                    </div>
                    <div className="p-4">
                        <h2 className='text-lg font-semibold text-slate-700'>{book.title}</h2>
                        <p className='text-base text-slate-600'>Author: {book.author}</p>
                        <p className='text-sm'>Discount Price: ₹{book.discountPrice} <del className='text-slate-600'>₹{book.price}</del></p>
                        <a href={`/view/${book._id}`} className='block bg-slate-700 px-8 py-2 mt-2 rounded-md text-slate-100 text-center'>Know More</a>
                    </div>
                </div>
            </div>
        );
    }

    // If book is an array, render multiple book cards using map
    return (
        <div className="grid grid-cols-4 gap-5 w-[95vw] mx-auto overflow-hidden">
            {book.map((singleBook, i) => (
                <div key={singleBook._id} className="w-96 h-auto border border-slate-300 shadow-lg rounded-md overflow-hidden p-3">
                    <div className="relative w-full h-80">
                        <Image src={`/bookImage/${singleBook.coverImage}`} layout="fill" alt='loading' className='rounded-t-md' />
                    </div>
                    <div className="p-4">
                        <h2 className='text-lg font-semibold text-slate-700'>{singleBook.title}</h2>
                        <p className='text-base text-slate-600'>Author: {singleBook.author}</p>
                        <p className='text-sm'>Discount Price: ₹{singleBook.discountPrice} <del className='text-slate-600'>₹{singleBook.price}</del></p>
                        <a href={`/view/${singleBook._id}`} className='block bg-slate-700 px-8 py-2 mt-2 rounded-md text-slate-100 text-center'>Know More</a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BookCard;





