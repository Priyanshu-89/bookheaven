


import Category from '@/app/models/Category';
import BookSchema from '@/app/models/BookSchema';
import Dbconnect from '@/app/libs/Dbconnect';
import CategoryBadges from '@/app/components/CategoryBadges';
import BookCard from '@/app/components/BookCard';

async function page({ params }) {
    await Dbconnect();
    let { cat_id } = params
    console.log(cat_id)
    let callCategory = await Category.find({}).lean();
    let getCategory = await Category.findById(cat_id).lean()
    let callBooks = await BookSchema.find({ category: cat_id }).lean()
    return (
        <div className="flex items-center justify-center  bg-slate-300 flex-col">



            <CategoryBadges data={callCategory} />


            <div className="grid grid-cols-5 gap-3  flex-wrap mt-4">
                <div className="col-span-5 text-center mb-4">
                    <h1 className="text-xl font-semibold">{getCategory.catTitle} ({callBooks.length})</h1>
                </div>
               {
                callBooks.map((book , i)=>
                <BookCard book ={book} key={i} />
                )
               }

                
            </div>






        </div >
    )
}

export default page
