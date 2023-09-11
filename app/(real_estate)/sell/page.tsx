"use client"
import { addToProduct } from '@/app/slices/property_slice'
import Link from 'next/link'
import React from 'react'
import { useDispatch } from 'react-redux'

const Page = () => {
  const dispatch = useDispatch()
  return (
    <div className='h-screen items-center   overflow-y-scroll flex flex-col'>
      <p className='sm:text-3xl text-xl font-bold py-24'>
        Which property do you wish to sell?
      </p>

   <div className='flex flex-col gap-10 w-full justify-center items-center'>
   <Link href={'/sell/commercial'} onClick={()=>dispatch(addToProduct({category:1}))} className='rounded bg-gray-200 text-2xl  sm:w-1/4 w-2/3 text-center p-3 hover:opacity-70 shadow:md'>

      Commercial Property
    </Link>
    <Link href={'/sell/residential'} onClick={()=>dispatch(addToProduct({category:2}))} className='rounded bg-gray-200 text-2xl p-3 sm:w-1/4 w-2/3 text-center  hover:opacity-70 shadow-md'>
      Residential Property
    </Link>
   </div>

    </div>
  )
}

export default Page 