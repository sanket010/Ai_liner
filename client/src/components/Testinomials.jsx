import React from 'react'
import { assets, testimonialsData } from '../assets/assets'

function Testinomials() {
    return (
        <div>

            <div className='text-center pt-16 pb-10'>
                <h1 className='text-xl text-[#252525] font-medium'>Customer testimonials</h1>
                <p className='text-[#797484]'>What Our Users Are Saying</p>
            </div>
            <div className='flex gap-6 max-sm:flex-wrap sm:justify-center items-center justify-between '>
                {
                    testimonialsData.map((testinomial, index) => {
                        return (
                            <div key={index} className='text-center flex flex-col items-center  hover:scale-105 transition-all duration-700 px-5 py-7 border border-gray-200 rounded-xl shadow-lg'>
                                <img className='w-8' src={testinomial.image} alt="" />
                                <p className='text-[#62577B] text-sm pt-2.5'>{testinomial.name}</p>
                                <p className='text-[#62577B] text-xs pb-3'>{testinomial.role}</p>
                                {/* <p>{testinomial.stars}</p> */}
                                <div className='flex items-center gap-1'>
                                    {
                                        Array(testinomial.stars).fill(0).map((star, index) => {
                                            return (
                                                <img key={index} src={assets.star_icon} alt="" />
                                            )
                                        })
                                    }
                                </div>
                                <p className='text-xs text-[#797484] pt-3'>{testinomial.text}</p>

                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default Testinomials