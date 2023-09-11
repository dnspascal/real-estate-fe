"use client"

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowBack } from '@mui/icons-material';
import { properties } from '@/constants';
import { useDispatch } from 'react-redux';
import { specificProperties } from "@/app/slices/specific_buying_properties";


const Page = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const settingSpecificPropertyType = () => {

        const specificPropertiesData = properties.filter((i) => i.type == "commercial space",)
        dispatch(specificProperties(specificPropertiesData))
        console.log("==============");
        console.log(specificPropertiesData);
        console.log("==============")

    }
    return (
        <main className='flex flex-col '>
            <button className='flex bg-black p-2 m-4 text-[#f8fafc]  w-[5.5rem] rounded-md' onClick={() => router.back()}>
                <ArrowBack />    Back
            </button>
            <div className='flex flex-col items-center  py-24 gap-y-10'>
                <span className='sm:text-3xl text-lg font-bold p-4 sm:p-0'>
                    Which Commercial Property Are You Looking For?
                </span>
                <div className='flex flex-col gap-y-6 p-4 sm:p-0'>
                    <Link
                        onClick={settingSpecificPropertyType}
                        href="/buy/commercial/commercial_properties" className='bg-[#f8fafc] drop-shadow-xl sm:w-[26rem] w-[17rem] text-black rounded-lg px-10 py-3 text-sm sm:text-xl'>
                        Commercial Space/Business Frame
                    </Link>
                    <Link href="/buy/commercial/commercial_properties" className='bg-[#f8fafc] drop-shadow-xl sm:w-[26rem] w-[17rem] text-black rounded-lg px-10 py-3 text-sm sm:text-xl'>
                        Commercial Building
                    </Link>
                </div>
            </div>
        </main >
    )
}

export default Page