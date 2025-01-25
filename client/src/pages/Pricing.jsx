import React from 'react'
import { assets, plans } from '../assets/assets'
import { motion } from 'framer-motion'

function Pricing() {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{}}
      className='mb-16'
    >
      <div className='flex flex-col justify-center items-center gap-5 pt-10 pb-14'>
        <button className='text-sm px-8 py-2 bg-white border border-[#C1C1C1] rounded-full cursor-pointer'>OUR PLANS </button>
        <h1 className=' font-medium text-3xl'>Choose the plan</h1>
      </div>
      <div className='flex flex-wrap justify-center gap-6 '>
        {
          plans.map((plan, index) => {
            return (
              <div key={index} className='border py-8 px-8 flex flex-col  rounded-lg border-[#EDEDED] hover:scale-105 transition-all duration-500 '>
                <img className='w-7' src={assets.logo_icon} alt="" />
                <p className='pt-2 pb-2 font-medium text-[#515151]'>{plan.id}</p>
                <p className='text-sm text-[#515151]'>{plan.desc}</p>
                <p className='text-[#515151] text-3xl font-bold pt-4 pb-6'>${plan.price} <span className='text-sm text-[#515151]'>/{plan.credits} credits</span></p>
                <button className='rounded-md cursor-pointer px-10 py-2 text-white bg-[#262626] font-medium leading-[28px]'>Get Started</button>
              </div>
            )
          })
        }
      </div>
    </motion.div>
  )
}

export default Pricing