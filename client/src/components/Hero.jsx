import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import App from '../App'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

function Hero() {

    const { user, showLogin, setShowLogin, token } = useContext(AppContext)
    const navigate = useNavigate()
    const onclickHandler = () => {
        if (user && token) {
            console.log(user);

            navigate('/result')
        }
        else {
            setShowLogin(true)
        }
    }
    return (
        <motion.div className=''
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{}}

        >
            <div className=' text-center flex flex-col justify-center items-center'>
                <motion.div
                    className='flex justify-center w-fit items-center mt-16 mb-8 gap-1 bg-white rounded-full border border-black px-6 py-1.5'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    <p className='text-xs sm:text-sm lg:text-lg'>Best text to image generator</p>
                    <img className='w-2 sm:w-5 lg:w-7 max-sm:pt-1' src={assets.star_icon} alt="" />
                </motion.div>
                <div>
                    <motion.h1 className='mb-5 text-3xl sm:text-5xl lg:text-7xl font-bold'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 2 }}
                    >Turn text to <br /> <span className='text-blue-500'  >image</span>, in seconds.</motion.h1>
                    <motion.p className=''
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >Unleash your creativity with AI. Turn your imagination into visual art in <br /> seconds – just type, and watch the magic happen.</motion.p>
                </div>
                <motion.button onClick={onclickHandler}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ default: { duration: 0.5 }, opacity: { delay: 0.8, duration: 1 } }}
                    className='px-8 py-2 bg-gray-800 text-white flex items-center gap-1 rounded-full text-base mt-12 mb-20 hover:scale-105 transition-all duration-700 cursor-pointer'>
                    <p>Generate Images </p>
                    <img className='w-4' src={assets.star_group} alt="" />
                </motion.button>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    <div className='flex gap-3 mb-6 '>
                        <motion.img
                            whileHover={{ scale: 1.05, duration: 0.1 }}
                            className='w-8 sm:w-14 lg:w-20 rounded-lg' src={assets.sample_img_1} alt="" />
                        <motion.img
                            whileHover={{ scale: 1.05, duration: 0.1 }}
                            className='w-8 sm:w-14 lg:w-20 rounded-lg' src={assets.sample_img_2} alt="" />
                        <motion.img
                            whileHover={{ scale: 1.05, duration: 0.1 }}
                            className='w-8 sm:w-14 lg:w-20 rounded-lg' src={assets.sample_img_1} alt="" />
                        <motion.img
                            whileHover={{ scale: 1.05, duration: 0.1 }}
                            className='w-8 sm:w-14 lg:w-20 rounded-lg' src={assets.sample_img_2} alt="" />
                        <motion.img
                            whileHover={{ scale: 1.05, duration: 0.1 }}
                            className='w-8 sm:w-14 lg:w-20 rounded-lg' src={assets.sample_img_1} alt="" />
                        <motion.img
                            whileHover={{ scale: 1.05, duration: 0.1 }}
                            className='w-8 sm:w-14 lg:w-20 rounded-lg' src={assets.sample_img_2} alt="" />
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                    >Generated images from imagify</motion.p>

                </motion.div>




            </div>
        </motion.div>
    )
}

export default Hero