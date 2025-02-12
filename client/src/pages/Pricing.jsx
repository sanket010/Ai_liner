import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Pricing() {
  const { token, setToken, backendUrl, loadUserCredits, setShowLogin } = useContext(AppContext)
  const navigate = useNavigate()

  const initPay = async (order) => {

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "redits Payment",
      description: "Payment for credits",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {

          const { data } = await axios.post(backendUrl + "/api/user/verify-razorpay", response, { headers: { token } })
          if (data.success) {

            loadUserCredits();
            navigate('/')
            // toast.success('Credit added')

          }

        } catch (error) {
          console.log(error.message);
        }

      }

    }
    const rzp = new window.Razorpay(options)
    rzp.open()

  }

  const paymentRazorpay = async (planId) => {
    try {
      if (!token) {
        setShowLogin(true);
      }

      const { data } = await axios.post(backendUrl + "/api/user/razorpay-payment", { planId }, { headers: { token } })
      if (data.success) {
        initPay(data.order)
      }


    } catch (error) {
      console.log(error);
    }
  }

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
                <button onClick={() => paymentRazorpay(plan.id)} className='rounded-md cursor-pointer px-10 py-2 text-white bg-[#262626] font-medium leading-[28px]'>Get Started</button>
              </div>
            )
          })
        }
      </div>
    </motion.div>
  )
}

export default Pricing