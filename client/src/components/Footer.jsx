import React from 'react'
import { assets } from '../assets/assets'

function Footer() {
    return (
        <div>
            <div className='flex flex-col items-center pb-20'>
                <div className='text-center pt-16 pb-6'>
                    <h1 className='text-xl text-[#252525] font-medium'>See the magic. Try now</h1>

                </div>
                <button className='px-8 py-2 bg-gray-800 text-white flex items-center gap-1 rounded-full text-base hover:scale-105 transition-all duration-700 cursor-pointer'>
                    <p>Generate Images </p>
                    <img className='w-4' src={assets.star_group} alt="" />
                </button>
            </div>

            {/* footer section */}

            <div className='flex justify-between items-center pb-5'>
                <div className='flex gap-3 items-center'>
                    <img className='h-7 max-sm:hidden' src={assets.logo} alt="" />
                    <img className='h-7 sm:hidden' src={assets.logo_icon} alt="" />
                    <p className='text-[#797484]'>|</p>
                    <p className='text-[#797484]'><span className='max-sm:hidden'>All right reserved. </span>Copyright @imagify</p>
                </div>
                <div className='flex gap-3 items-center'>
                    <img className='rounded-full w-8 ' src={assets.facebook_icon} alt="" />
                    <img className='rounded-full w-8' src={assets.twitter_icon} alt="" />
                    <img className='rounded-full w-8' src={assets.instagram_icon} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Footer