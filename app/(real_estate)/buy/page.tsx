import Link from 'next/link';
import React from 'react';

const Page = () => {
    return (
        <main className='flex flex-col items-center gap-y-16 py-24'>
            <span className='sm:text-3xl text-lg font-bold'>
                What do you want to buy?
            </span>
            <div className='space-y-6 flex flex-col'>
                <Link href="/buy/commercial" className='bg-[#f8fafc] drop-shadow-xl sm:w-[26rem] w-[17rem] text-black rounded-lg px-10 py-3 text-sm sm:text-xl'>
                    Commercial Property
                </Link>
                <Link href="/buy/residential" className='bg-[#f8fafc] drop-shadow-xl sm:w-[26rem] w-[17rem] text-black rounded-lg px-10 py-3 text-sm sm:text-xl'>
                    Residential Property
                </Link>
            </div>
        </main>
    )
}

export default Page