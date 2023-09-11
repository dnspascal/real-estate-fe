import React from 'react'
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addToProduct } from '@/app/slices/property_slice';

interface PropertyComponentProps{
  name:string;
  icon:React.ReactNode;
  link:string;
  property_type:number
  
}

const PropertyComponent:React.FC<PropertyComponentProps> = ({name,icon,link,property_type}) => {
  const dispatch = useDispatch()
  return (
    <Link href={link} onClick={()=>dispatch(addToProduct({type:property_type}))} className='border flex flex-col items-center justify-center rounded-lg p-3 hover:opacity-70 cursor-pointer'>
    <h1 className='text-xl'>{name}</h1>
    {icon}

  </Link>
  )
}

export default PropertyComponent