
import Dbconnect from '@/app/libs/Dbconnect';
import Category from '@/app/models/Category';
import { redirect } from 'next/navigation';


async function CategoryPage() {
    let catInfo = await Category.find({});

    const handleSubmit = async (formData) => {

        "use server"
        await Dbconnect();

        console.log(formData)
        let catTitle = formData.get("catTitle");
        let catDesc = formData.get("catDesc");

        await Category.create({ catTitle: catTitle, catDesc: catDesc })
        redirect("/admin/category")


    }
    return (
        <div className='flex gap-2 flex-col'>
            <div className="flex-1">
                <h2 className='text-xl font-semibold text-cyan-700 ml-6'>Manage Categories({catInfo.length})</h2>
            </div>
            <div className="flex gap-2">
                <div className="w-2/3 mt-3 ml-2">
                    <table className='boder w-full'>
                        <thead>
                            <tr>
                                <th className='border border-cyan-700 text-cyan-700 text-base  p-2'>Id</th>
                                <th className='border border-cyan-700 text-cyan-700 text-base  p-2'>Category Title</th>
                                <th className='border border-cyan-700 text-cyan-700 text-base  p-2'>Category Description</th>
                                <th className='border border-cyan-700 text-cyan-700 text-base  p-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                catInfo.map((cat, i) =>{
                                   
                                    return(
                                    <tr key={i}>
                                        <td className='border p-2'>{i + 1}</td>
                                        <td className='border p-2'>{cat.catTitle}</td>
                                        <td className='border p-2'>{cat.catDesc}</td>
                                        <td className='border p-2'>
                                            {/* <form action={handleDelete} method='POST'>
                                                <button type="submit"  className='text-red-600 '>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
</svg>

                                               
                                                    </button>  
                                            </form> */}
                                        </td>
                                    </tr>
                                )})
                            }


                        </tbody>
                    </table>
                </div>
                <div className="w-1/3">
                    <div className="bg-teal-50 shadow-lg border border-teal-200 p-2 mt-3 mr-3">
                        <div className="flex items-center justify-center">
                            <div className="bg-white p-8 rounded shadow-md w-96">
                                <h2 className="text-2xl font-semibold mb-4 text-center text-cyan-800">Insert Category</h2>
                                <form action={handleSubmit} method='POST'>
                                    <div className="mb-4">
                                        <label htmlFor="catTitle" className="block text-sm font-medium text-gray-600">
                                            Category Title
                                        </label>
                                        <input
                                            type="text"
                                            id="catTitle"
                                            name="catTitle"
                                            className="mt-1 p-2 w-full border rounded-md"
                                            placeholder="Enter your category title"


                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="catDesc" className="block text-sm font-medium text-gray-600">
                                            Category Description
                                        </label>
                                        <textarea
                                            type="text"
                                            id="catDesc"
                                            name="catDesc"
                                            className="mt-1 p-2 w-full border rounded-md"
                                            placeholder="Enter your category Description"

                                        />
                                    </div>

                                    <button
                                        type="submit"

                                        className="w-full bg-cyan-700 text-white p-2 rounded-md hover:bg-cyan-800"
                                    >
                                        Create Category
                                    </button>
                                </form>
                           
          
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryPage