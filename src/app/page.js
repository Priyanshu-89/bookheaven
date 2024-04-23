
import Category from './models/Category'
import Dbconnect from './libs/Dbconnect'

import BookSchema from './models/BookSchema';

import HomePage from './components/HomePage';

async function page() {
  await Dbconnect();
  let callCategory = await Category.find({}).lean()
  let callBooks = await BookSchema.find({}).lean()
  return (
    <>
    <HomePage callBooks={callBooks} callCategory={callCategory}/>
    </>
  )
}

export default page
