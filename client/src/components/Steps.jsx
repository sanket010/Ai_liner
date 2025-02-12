import React from 'react'
import { stepsData } from '../assets/assets'
import { motion } from 'framer-motion'

function Steps() {
    return (
        <motion.div className=''
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{  }}
        >

            <div className='text-center pt-16 pb-10'>
                <h1 className='text-xl text-[#252525] font-medium'>How it works</h1>
                <p className='text-[#797484]'>Transform words into Stunning Images</p>
            </div>
            <div className='flex flex-col gap-6 '>
                {
                    stepsData.map((step, index) => {
                        return (
                            <div key={index} className='cursor-pointer flex gap-4 border border-gray-200 rounded-xl box-content items-center px-4 py-6 hover:scale-105 transition-all duration-500 shadow-lg'>
                                <img src={step.icon} alt="" />
                                <div className='flex flex-col gap-1 '>
                                    <p className='text-sm text-gray-900'>{step.title}</p>
                                    <p className='text-xs text-gray-400'>"{step.description}"</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </motion.div>
    )
}

export default Steps