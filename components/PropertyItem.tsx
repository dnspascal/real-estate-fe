import React from 'react'

interface PropertyProps {
  item: {
    name: string,
    location: string,
    price: number,
    imgUrl: string,
    published: string,
    utilities: Array<string>
  }
}

const PropertyItem: React.FC<PropertyProps> = ({ item }) => {
  return (
    <div className='flex flex-col text-sm  sm:text-md drop-shadow-2xl  w-[200px] sm:w-[15rem] md:w-[20rem] lg:w-[28rem] xl:w-[22rem] rounded bg-white border '>
      <div className='basis-3/4'>
        <img src={item.imgUrl} alt={item.name} className='w-full h-full object-cover' />
      </div>
      <div className='flex flex-col basis-1/4 p-3'>
        <span className='font-bold text-lg md:text-xl'>{item.name}</span>
        <span>{item.location}</span>
        <div className='flex justify-between gap-x-3'>
          {item.utilities.map((item, key) => <span className='rounded-md p-1 bg-gray-200' key={key}>{item}</span>)}
        </div>
        <div className='flex justify-start'>

          <span className='font-bold gap-x-1 flex'>
            {item.price} <h1>TZs</h1>
          </span>
        </div>
      </div>
    </div>
  )
}

export default PropertyItem