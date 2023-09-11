"use client"
import PropertyComponent from '@/components/PropertyComponent'
import { Business, MeetingRoom } from '@mui/icons-material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import {useSelector} from 'react-redux'

const CommercialCategory = () => {
  const router = useRouter()
  const name = useSelector((state:any)=>state.property.property_type)
  console.log(name)
  return (
    <div className='sm:p-5 p-3 flex flex-col h-screen'>
      <button onClick={()=>router.back()} className='p-3 self-start rounded bg-gray-200'>
        Previous
      </button>
      <div className='flex items-center flex-col   h-full gap-y-6'>
        <p className='sm:text-3xl text-lg font-bold'>Choose property type you wish to sell</p>
       <div className='flex gap-10 sm:flex-row flex-col'>
      <PropertyComponent name={'Commercial Space'} property_type={1} icon={<MeetingRoom/>} link={'commercial/add_commercial_property'} />
      <PropertyComponent name={'Business Space'} property_type={2} icon={<Business/>} link={'commercial/add_commercial_property'} />
       </div>

      </div>

    </div>
  )
}

export default CommercialCategory