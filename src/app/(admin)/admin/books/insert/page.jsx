import Dbconnect from '@/app/libs/Dbconnect';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Category from '@/app/models/Category';
import {join} from 'path'
import { writeFile } from 'fs/promises';
import BookSchema from '@/app/models/BookSchema';

async function InsertPage() {
    let callingCat = await Category.find({});

    const handleSubmit = async (formData) => {

        "use server"
        await Dbconnect();

        console.log(formData)
        let title = formData.get("title");
        let description = formData.get("description");
        let author=formData.get("author");
        let category=formData.get("category");
        let price=formData.get("price");
        let discountPrice=formData.get("discountPrice");
        let status=formData.get("status");
        let coverImage=formData.get("coverImage")
        
        let bytes=await coverImage.arrayBuffer();
        let buffer=Buffer.from(bytes);
        let path =join("./public", "bookImage", coverImage.name);
        await writeFile(path,buffer)
       

        await BookSchema.create({ title: title, description: description, author:author, category:category, price:price, discountPrice:discountPrice, status:status, coverImage:coverImage.name })
        redirect("/admin/books")


    }
    return (
        <div className='flex flex-col items-center justify-center'>

            <h2 className='text-xl font-semibold text-cyan-700 ml-6'>Insert Book</h2>


            <div className="w-1/2 mx-auto">
                <div className=" bg-teal-50 shadow-lg border border-cyan-200 p-2 mt-3 mr-3">
                    <div className="flex items-center justify-center">
                        <div className="bg-white p-8 rounded shadow-md w-full">
                            <h2 className="text-2xl font-semibold mb-4 text-center text-cyan-800">Insert Category</h2>
                            <form action={handleSubmit} method='POST'>
                                <div className='flex gap-3'>
                                    <div className="mb-4">
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                                            Enter Title
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            className="mt-1 p-2 w-full border rounded-md"
                                            placeholder="Enter your category title"


                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="author" className="block text-sm font-medium text-gray-600">
                                            Enter Author
                                        </label>
                                        <input
                                            type="text"
                                            id="author"
                                            name="author"
                                            className="mt-1 p-2 w-full border rounded-md"
                                            placeholder="Enter the author name"


                                        />
                                    </div>
                                </div>

                                <div className='flex gap-3'>
                                    <div className="mb-4">
                                        <label htmlFor="price" className="block text-sm font-medium text-gray-600">
                                            Enter price
                                        </label>
                                        <input
                                            type="text"
                                            id="price"
                                            name="price"
                                            className="mt-1 p-2 w-full border rounded-md"
                                            placeholder="Enter your book price"


                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="discountPrice" className="block text-sm font-medium text-gray-600">
                                            Enter Discount Price
                                        </label>
                                        <input
                                            type="text"
                                            id="discountPrice"
                                            name="discountPrice"
                                            className="mt-1 p-2 w-full border rounded-md"
                                            placeholder="Enter your book price"


                                        />
                                    </div>


                                </div>
                                <div className='flex gap-3'>
                                    <div className="mb-4">
                                        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-600">
                                            Enter Cover Image
                                        </label>
                                        <input
                                            type="file"
                                            id="coverImage"
                                            name="coverImage"
                                            className="mt-1 p-2 w-full border rounded-md"
                                            placeholder="Enter the status"


                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="status" className="block text-sm font-medium text-gray-600">
                                            Enter status
                                        </label>
                                        <input
                                            type="text"
                                            id="status"
                                            name="status"
                                            className="mt-1 p-2 w-full border rounded-md"
                                            placeholder="Enter the status"


                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-600">
                                        Enter category
                                    </label>
                                    <select
    type="text"
    id="category"
    name="category"
    className="mt-1 p-2 w-full border rounded-md"
>
    <option value="" disabled>--select category--</option>
    {callingCat.map((cat, i) => (
        <option key={i} value={cat._id}>
            {cat.catTitle}
        </option>
    ))}
</select>

                                </div>

                                <div className="mb-4">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                                        Category Description
                                    </label>
                                    <textarea
                                        type="text"
                                        rows={5}
                                        cols={4}
                                        id="description"
                                        name="description"
                                        className="mt-1 p-2 w-full border rounded-md"
                                        placeholder="Enter your category Description"

                                    />
                                </div>

                                <button
                                    type="submit"

                                    className="w-full bg-cyan-700 text-white p-2 rounded-md hover:bg-cyan-800"
                                >
                                    Insert Book
                                </button>
                            </form>

                        </div>

                    </div>
                </div>
                <Link href={"/admin/books"} className='inline-block px-4 py-2 bg-cyan-700 text-cyan-50 rounded-md mt-6 mb-4 hover:bg-cyan-800'>Go Back</Link>

            </div>
        </div>
    )
}

export default InsertPage