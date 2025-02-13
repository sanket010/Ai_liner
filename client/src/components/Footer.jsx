import React from 'react'
import { assets } from '../assets/assets'

function Footer() {
    return (
        <div className=''>
            

            {/* footer section */}

            <div className='flex justify-between items-center pb-5'>
                <div className='flex gap-3 items-center'>
                    <img className='h-7 cursor-pointer max-sm:hidden' src={assets.logo} alt="" />
                    <img className='h-7 sm:hidden' src={assets.logo_icon} alt="" />
                    <p className='text-[#797484]'>|</p>
                    <p className='text-[#797484]'><span className='max-sm:hidden'>All right reserved. </span>Copyright @imagify</p>
                </div>
                <div className='flex gap-3 items-center'>
                    <a href="https://www.facebook.com/profile.php?id=100041822179627"><img className='rounded-full w-8  cursor-pointer' src={assets.facebook_icon} alt="" /></a>
                    <a href="https://x.com/Shubham22142019"><img className='rounded-full w-8 cursor-pointer' src={assets.twitter_icon} alt="" /></a>
                    <a href="https://www.instagram.com/shubham_quant/"><img className='rounded-full w-8 cursor-pointer' src={assets.instagram_icon} alt="" /></a>
                </div>
            </div>
        </div>
    )
}

export default Footer