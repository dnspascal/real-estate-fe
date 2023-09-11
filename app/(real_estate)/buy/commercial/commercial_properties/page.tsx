
"use client"
import PropertyItem from '@/components/PropertyItem'
import React from 'react'
import { useSelector } from 'react-redux'

const page = () => {
    const specificProperties = useSelector((state: any) => state.specificProperties.items)

    console.log("==============");
    console.log("this is the other array of data")
    console.log(specificProperties[0].type);
    console.log("==============")
    return (
        <main className='p-6'>
            <span>All available
                <span className='font-bold'>
                    {specificProperties[0]?.type}</span>
            </span>


            <div className='flex flex-col sm:flex-row flex-wrap items-center h-full gap-y-8 sm:justify-around' >
                {
                    specificProperties?.map((item: { name: string; location: string; price: number; imgUrl: string; published: string; utilities: string[] }, index: React.Key | null | undefined) =>
                        <PropertyItem item={item} key={index} />)}
            </div>
        </main>)
}

export default page