import '../../globals.css'
import AdminHeader from '@/app/components/AdminHeader'
import Link from 'next/link'

export const metadata = {
  title: 'Admin panel',
  description: 'Controlled by admin',
}

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body>
     

        <div className="flex gap-2">
          <div className="w-1/4 bg-cyan-700 rounded-md p-4 ml-3 mt-3">
            <div className="flex flex-col items-center gap-4 ">
              <Link href="/admin" className='text-cyan-50 rounded-md py-2 px-4 hover:bg-cyan-800'>Dashboard</Link>
              <Link href="/admin/users" className='text-cyan-50 rounded-md py-2 px-4 hover:bg-cyan-800'>Manage User</Link>
              <Link href="/admin/category" className='text-cyan-50 rounded-md py-2 px-4 hover:bg-cyan-800'>Manage Categories</Link>
              <Link href="/admin/books" className='text-cyan-50 rounded-md py-2 px-4 hover:bg-cyan-800'>Manage Books</Link>
              <Link href="/admin/orders" className='text-cyan-50 rounded-md py-2 px-4 hover:bg-cyan-800'>Manage Orders</Link>
              <Link href="#" className='text-cyan-50 rounded-md py-2 px-4 hover:bg-cyan-800'>Manage payments</Link>
              <Link href="#" className='text-cyan-50 rounded-md py-2 px-4 hover:bg-cyan-800'>Logout</Link>
            </div>
          </div>
          <div className="w-3/4">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
