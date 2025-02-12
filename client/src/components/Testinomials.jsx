import React, { useContext } from 'react'
import { assets, testimonialsData } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
function Testinomials() {

    const { user, setShowLogin } = useContext(AppContext)
    const navigate = useNavigate()


    const onclickHandler = () => {
        if (user) {
            navigate('/result')
        }
        else {
            setShowLogin(true)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{}}
        >
            <div className='text-center pt-16 pb-10'>
                <h1 className='text-xl text-[#252525] font-medium'>Customer testimonials</h1>
                <p className='text-[#797484]'>What Our Users Are Saying</p>
            </div>
            <div className='flex gap-6 max-sm:flex-wrap sm:justify-center items-center justify-between '>
                {
                    testimonialsData.map((testinomial, index) => {
                        return (
                            <div key={index} className='text-center flex flex-col items-center  hover:scale-105 transition-all duration-700 px-5 py-7 border border-gray-200 rounded-xl shadow-lg cursor-pointer'>
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


            <motion.div
                initial={{ opacity: 0.2, y: 100 }}
                transition={{ duration: 1 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className='flex flex-col items-center pb-20'>
                <div className='text-center pt-16 pb-6'>
                    <h1 className='text-xl text-[#252525] font-medium'>See the magic. Try now</h1>
                </div>
                <button onClick={onclickHandler} className='px-8 py-2 bg-gray-800 text-white flex items-center gap-1 rounded-full text-base hover:scale-105 transition-all duration-700 cursor-pointer'>
                    <p>Generate Images </p>
                    <img className='w-4' src={assets.star_group} alt="" />
                </button>
            </motion.div>

        </motion.div>
    )
}

export default Testinomials