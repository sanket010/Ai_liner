import React from 'react'
import { assets } from '../assets/assets'

function Footer() {
    return (
        <div className=''>
            

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