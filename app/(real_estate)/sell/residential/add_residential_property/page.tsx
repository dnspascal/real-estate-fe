"use client"
import AddProperty from '@/components/AddProperty'
import { useRouter } from 'next/navigation'
import React from 'react'

const Page = () => {
  const router = useRouter()
  return (
    <div className='flex items-center flex-col   h-screen  w-full'>
<div className='w-full p-3 '>
<button onClick={()=>router.back()} className='p-3 float-left justify-start rounded bg-gray-200'>
        Previous
      </button>
</div>
        <AddProperty/>
    </div>
  )
}

export default Page