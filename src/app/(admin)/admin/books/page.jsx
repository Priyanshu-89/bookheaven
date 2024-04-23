
import BookSchema from '@/app/models/BookSchema';
import Image from 'next/image';
import Link from 'next/link';

async function BooksPage() {
    let bookInfo = await BookSchema.find({}).populate('category');
    

    return (
        <div className='flex gap-2 flex-col max-w-6xl mx-auto'>
            <div className="flex justify-around mt-2 items-center">
                <h2 className='text-xl font-semibold text-cyan-700 ml-6'>Manage Books({bookInfo.length})</h2>
                <Link href={"/admin/books/insert"} className='px-8 py-2 bg-cyan-500 text-cyan-50 rounded-md mb-4 cursor-pointer hover:bg-cyan-800 self-center'>Add Book</Link>
            </div>
            <div className="flex gap-2 justify-around">
                <div className="w-2/3 mt-3 ml-2">
                    <table className='border w-full'>
                        <thead>
                            <tr>
                                <th className='border border-cyan-700 text-cyan-700 text-base p-2'>Id</th>
                                <th className='border border-cyan-700 text-cyan-700 text-base p-2'>Title</th>
                                <th className='border border-cyan-700 text-cyan-700 text-base p-2'>Description</th>
                                <th className='border border-cyan-700 text-cyan-700 text-base p-2'>Category</th>
                                <th className='border border-cyan-700 text-cyan-700 text-base p-2'>Price</th>
                                <th className='border border-cyan-700 text-cyan-700 text-base p-2'>Cover Image</th>
                                <th className='border border-cyan-700 text-cyan-700 text-base p-2'>Author</th>
                                <th className='border border-cyan-700 text-cyan-700 text-base p-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookInfo.map((book, i) => {
                              
                                return (
                                    <tr key={i}>
                                        <td className='border p-2'>{i + 1}</td>
                                        <td className='border p-2'>{book.title}</td>
                                        <td className='border p-2'>{book.description}</td>
                                        <td className='border p-2'>{book.category ? book.category.catTitle : 'N/A'}</td>

                                        <td className='border p-2'>{book.price} {book.discountPrice}</td>
                                        <td className='border p-2'>
                                            <Image width={50} height={50} className='object-cover' src={`/bookImage/${book.coverImage}`} />
                                        </td>
                                        <td className='border p-2'>{book.author}</td>
                                        {/* <td className='border p-2'>
                                            <button onClick={handleRemove}>Delete</button>
                                        </td> */}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default BooksPage;
