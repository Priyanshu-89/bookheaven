import BookCard from '@/app/components/BookCard'
import ViewBook from '@/app/components/ViewBook'
import BookSchema from '@/app/models/BookSchema'

import React from 'react'

async function KnowMore({params}) {
    let {bookid}=params
    const book=await BookSchema.findById(bookid)
    console.log("My book is", book)
    const relatedBooks=await BookSchema.find({"_id":{$ne:bookid}}); // Rename relatedBook to relatedBooks
    console.log("Related books are", relatedBooks);
    
    return (
        <div className='max-w-[100vw] mx-auto'>
            <ViewBook book={book}/>

            {/* Recent books */}
            <div className="flex-1 flex flex-col gap-4 mt-8 text-slate-800 font-semibold">
                <h1 className='text-center'>You may also like:</h1>
                <div className="grid grid-cols-4 gap-5 w-[95vw] mx-auto overflow-hidden">
                    {relatedBooks.map((book, i) =>  
                        <BookCard book={book} key={i}/> 
                    )}
                </div>
            </div>
        </div>
    )
}

export default KnowMore;
