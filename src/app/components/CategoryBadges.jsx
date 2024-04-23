import React from 'react'
import Link from 'next/link'
const CategoryBadges = ({data}) => {
  return (
    <div>
       <div className="flex flex-wrap gap-4 mt-4">
        {data.map((cat, i) => (
          <Link href={`/catrgories/${cat._id}`} key={i} className="bg-cyan-600 px-8 py-1 rounded-md text-cyan-50 text-base">{cat.catTitle}</Link>
        ))}
      </div>
     
    </div>
  )
}

export default CategoryBadges
