"use client"
import Attributes from '@/components/Attributes'
import React from 'react'
import { useSelector } from 'react-redux'

const CommercialAttributes = () => {
  const theData = useSelector((state:any)=>state.property)
  console.log(theData)
  return (
    <div className='flex items-center flex-col'>
        <p className='font-bold text-2xl'>Tell us more about your </p>

        <Attributes/>
       
    </div>
  )
}

export default CommercialAttributes