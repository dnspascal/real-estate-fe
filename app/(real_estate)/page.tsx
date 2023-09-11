
import React, { useEffect } from 'react'
import options from '../api/auth/[...nextauth]/options';
import { CarouselTransition } from '@/components/Carousel';
import { properties } from '@/constants';
import PropertyItem from '@/components/PropertyItem';





const Home = () => {

  

  
  return (
    <div className='min-h-screen flex mt-4 md:mt-0 flex-col items-center pb-3'>
     
    <CarouselTransition/>
    
    <div className='w-full  h-full py-4 px-8 md:px-16'>
      <span className='text:xl md:text-3xl font-bold'>Houses</span>
      <div className='flex w-full md:justify-between scrollBar  gap-x-10 h-full overflow-x-scroll '>
          {
            properties.map((item,index)=>(<PropertyItem key={index}  item={item}  />))
          }
      </div>
    </div>
    <div className='w-full h-full py-4 px-8 md:px-16'>
      <span className='text:xl md:text-3xl font-bold'>Rooms</span>
      <div className='flex w-full md:justify-between gap-x-10 scrollBar  overflow-x-scroll'>
          {
            properties.map((item,index)=>(<PropertyItem key={index}  item={item}  />))
          }
      </div>
    </div>
    <div className='w-full h-full py-4 px-8 md:px-16'>
      <span className='text:xl md:text-3xl font-bold'>Commercial Spaces</span>
      <div className='flex w-full md:justify-between scrollBar gap-x-10 overflow-x-scroll'>
          {
            properties.map((item,index)=>(<PropertyItem key={index}  item={item}  />))
          }
      </div>
    </div>
    </div>
  )
}

export default Home