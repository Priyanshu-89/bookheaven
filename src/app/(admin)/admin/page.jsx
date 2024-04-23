

const AdminPage=async()=> {
  let countData=await fetch("http://localhost:3000/api/count");
  countData=await countData.json();
  // console.log(countData)
  return (
    <div className='flex gap-3 p-5 w-full  items-center justify-evenly'>
    <div className="flex gap-2 items-center justify-between  bg-slate-400 text-slate-900 p-3 rounded-sm shadow-sm">
    <h3 className="text-sm font-semibold uppercase text-slate-700">Total Books:</h3>
        <h2 className="text-sm font-semibold  text-slate-700">{countData.BookCount}</h2>
        
    </div>

    <div className="flex gap-2 bg-red-400 text-slate-900 p-3 rounded-sm shadow-sm">
    <h3 className="text-sm font-semibold uppercase text-slate-700">Total Orders:</h3>
        <h2 className="text-sm font-semibold  text-slate-700">{countData.orderCount}</h2>
        
    </div>

    <div className="flex gap-2 items-center justify-between bg-teal-400 text-slate-900 p-3 rounded-sm shadow-sm">
    <h3 className="text-sm font-semibold uppercase text-slate-700">Total Categories:</h3>
        <h2 className="text-sm font-semibold  text-slate-700">{countData.categoryCount}</h2>
       
    </div>

    <div className="flex gap-2 items-center justify-between bg-violet-400 text-slate-900 p-3 rounded-sm shadow-sm">
    <h3 className="text-sm font-semibold uppercase text-slate-700">Total User:</h3>
        <h2 className="text-sm font-semibold  text-slate-700">{countData.userCount}</h2>
        
    </div>
    </div>
  )
}

export default AdminPage