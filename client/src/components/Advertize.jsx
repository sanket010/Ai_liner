import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

function Advertize() {
    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{  }}
        >
            <div className='text-center pt-16 pb-10'>
                <h1 className='text-xl text-[#252525] font-medium'>Create AI Images</h1>
                <p className='text-[#797484]'>Turn your imagination into visuals</p>
            </div>
            <div className='flex flex-col  md:gap-14 md:flex-row gap-5 items-center'>
                <img className='w-80 xl:w-96 rounded-lg' src={assets.sample_img_2} alt="" />
                <div className='flex  flex-col'>
                    <p className='text-[#4B445A] font-medium max-w-lg mb-4' >Introducing the AI-Powered Text to Image Generator</p>
                    <p className='text-[#797484] mb-4'>Easily bring your ideas to life with our free AI image generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks. Imagine it, describe it, and watch it come to life instantly.</p>
                    <p className='text-[#797484]'>Simply type in a text prompt, and our cutting-edge AI will generate high-quality images in seconds. From product visuals to character designs and portraits, even concepts that don’t yet exist can be visualized effortlessly. Powered by advanced AI technology, the creative possibilities are limitless!</p>
                </div>
            </div>
        </motion.div>
    )
}

export default Advertize