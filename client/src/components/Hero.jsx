import React from 'react'
import { assets } from '../assets/assets'

function Hero() {
    return (
        <div className=''>
            <div className=' text-center flex flex-col justify-center items-center'>
                <div className='flex justify-center w-fit items-center mt-16 mb-8 gap-1 bg-white rounded-full border border-black px-6 py-1.5'>
                    <p className='text-xs sm:text-sm lg:text-lg'>Best text to image generator</p>
                    <img className='w-2 sm:w-5 lg:w-7 max-sm:pt-1' src={assets.star_icon} alt="" />
                </div>
                <div>
                    <h1 className='mb-6 text-3xl sm:text-5xl lg:text-7xl font-bold'>Turn text to <br /> <span className='text-blue-500'>image</span>, in seconds.</h1>
                    <p>Unleash your creativity with AI. Turn your imagination into visual art in <br /> seconds – just type, and watch the magic happen.</p>
                </div>
                <div className='px-8 py-2 bg-gray-800 text-white flex items-center gap-1 rounded-full text-base mt-12 mb-20 hover:scale-105 transition-all duration-700 cursor-pointer'>
                    <p>Generate Images </p>
                    <img className='w-4' src={assets.star_group} alt="" />
                </div>
                <div>
                    <div className='flex gap-3 mb-6 '>
                        <img className='w-8 sm:w-14 lg:w-20 rounded-lg' src={assets.sample_img_1} alt="" />
                        <img className='w-8 sm:w-14 lg:w-20 rounded-lg' src={assets.sample_img_2} alt="" />
                        <img className='w-8 sm:w-14 lg:w-20 rounded-lg' src={assets.sample_img_1} alt="" />
                        <img className='w-8 sm:w-14 lg:w-20 rounded-lg' src={assets.sample_img_2} alt="" />
                        <img className='w-8 sm:w-14 lg:w-20 rounded-lg' src={assets.sample_img_1} alt="" />
                        <img className='w-8 sm:w-14 lg:w-20 rounded-lg' src={assets.sample_img_2} alt="" />
                    </div>
                    <p>Generated images from imagify</p>

                </div>




            </div>
        </div>
    )
}

export default Hero