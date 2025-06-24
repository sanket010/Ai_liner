import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'

function Pricing() {
  const { token, setShowLogin } = useContext(AppContext)

  // Simplified plans array with free tier only
  const plans = [
    {
      id: 'Free',
      name: 'Free Tier',
      price: '0',
      credits: 5,
      features: [
        '5 free credits',
        'Basic image generation',
        'Standard resolution',
        'Community support'
      ]
    }
  ]

  return (
    <div className='min-h-screen bg-[#F8F8F8] py-20 px-4'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-4xl md:text-5xl font-bold text-center mb-4'>Simple, Transparent Pricing</h1>
        <p className='text-center text-gray-600 mb-12 max-w-2xl mx-auto'>
          Start with our free tier and create amazing AI-generated images. No credit card required.
        </p>
        
        <div className='grid md:grid-cols-3 gap-8 mt-12'>
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className='bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow'
            >
              <div className='p-8'>
                <h3 className='text-2xl font-bold mb-2'>{plan.name}</h3>
                <div className='flex items-baseline mb-6'>
                  <span className='text-4xl font-bold'>${plan.price}</span>
                  <span className='text-gray-500 ml-2'>/ month</span>
                </div>
                
                <ul className='space-y-3 mb-8'>
                  {plan.features.map((feature, i) => (
                    <li key={i} className='flex items-center'>
                      <svg className='w-5 h-5 text-green-500 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button 
                  className='w-full bg-[#262626] text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors'
                  onClick={() => !token && setShowLogin(true)}
                >
                  {token ? 'Current Plan' : 'Get Started'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className='mt-16 text-center'>
          <h2 className='text-2xl font-bold mb-4'>Need more credits?</h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Our free tier provides everything you need to get started with AI image generation.
            If you have any questions, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Pricing