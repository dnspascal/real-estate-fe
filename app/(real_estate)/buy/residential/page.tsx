"use client"
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowBack } from '@mui/icons-material';

const page = () => {
    const router = useRouter();
    return (
        <main className='flex  flex-col  bg-white'>
            <button className='flex bg-black p-2 m-4 text-[#f8fafc]  w-[5.5rem] rounded-md' onClick={() => router.back()}>
                <ArrowBack />    Back
            </button>
          <div className='flex flex-col py-24 items-center gap-y-10'>
          <span className='sm:text-3xl text-lg font-bold p-6 sm:p-0'>
                Which Residential Property Are You Looking For?
            </span>
            <div className='flex flex-col gap-y-6 p-4 sm:p-0'>
                <Link href="/buy/commercial" className='bg-[#f8fafc] drop-shadow-xl sm:w-[26rem] w-[17rem] text-black rounded-lg px-10 py-3 text-sm sm:text-xl'>
                    Room
                </Link>
                <Link href="/buy/commercial" className='bg-[#f8fafc] drop-shadow-xl sm:w-[26rem] w-[17rem] text-black rounded-lg px-10 py-3 text-sm sm:text-xl'>
                    House/Apartment
                </Link>

            </div>
          </div>

        </main >
    )
}

export default page