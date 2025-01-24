import React from 'react'
import { assets } from '../assets/assets'

function Advertize() {
    return (
        <div>
            <div className='text-center pt-16 pb-10'>
                <h1 className='text-xl text-[#252525] font-medium'>Create AI Images</h1>
                <p className='text-[#797484]'>Turn your imagination into visuals</p>
            </div>
            <div className='flex max-sm:flex-wrap gap-5 w-full'>
                <img className='w-[40%] max-sm:w-full' src={assets.sample_img_2} alt="" />
                <div className='flex  flex-col gap-3'>
                    <p className='text-[#4B445A]' >Introducing the AI-Powered Text to Image Generator</p>
                    <p className='text-[#797484]'>Easily bring your ideas to life with our free AI image generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks. Imagine it, describe it, and watch it come to life instantly.</p>
                    <p className='text-[#797484]'>Simply type in a text prompt, and our cutting-edge AI will generate high-quality images in seconds. From product visuals to character designs and portraits, even concepts that don’t yet exist can be visualized effortlessly. Powered by advanced AI technology, the creative possibilities are limitless!</p>
                </div>
            </div>
        </div>
    )
}

export default Advertize