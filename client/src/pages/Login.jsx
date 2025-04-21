import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import axios from 'axios'

function Login() {
  const [userState, setUserState] = useState('Login')
  const { showLogin, setShowLogin, backendUrl, token, setToken, loadUserCredits } = useContext(AppContext)

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const onSubmitHnadler = async (e) => {
    e.preventDefault()

    if (userState === 'Sign Up') {
      try {
        const response = await axios.post(backendUrl + "/api/user/register", { name, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem("token", response.data.token)
          setShowLogin(false)

        }
        else {
          console.log(response.data.message)
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    else {
      try {
        const response = await axios.post(backendUrl + "/api/user/login", { email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem("token", response.data.token)

          setShowLogin(false)

        }
        else {
          console.log(response.data.message)
        }
      } catch (error) {
        console.log(error.message)
      }
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])


  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      <motion.form onSubmit={onSubmitHnadler}
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{}}
        action="" className='rounded-xl relative bg-white p-10 text-slate-500 '
      >
        <h1 className='text-center pb-2 font-medium text-[#444444] text-2xl '>{userState}</h1>
        {
          userState === 'Login' ?
            <p className='text-sm'>Welcome back! Please sign in to continue</p>
            :
            <p className='text-sm'>Welcome, Create an Account to continue</p>
        }
        <div className='pt-6'>
          {userState === 'Sign Up' &&
            <div className='flex items-center gap-2 px-6 py-2 border rounded-full mt-5'>
              <img width={26} src={assets.profile_icon} alt="" />
              <input className='outline-none' value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Full Name' />
            </div>
          }
          <div className='flex items-center gap-2 px-6 py-2 border rounded-full mt-5'>
            <img src={assets.email_icon} alt="" />
            <input className='outline-none' value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Email id' />
          </div>
          <div className='flex items-center gap-2 px-6 py-2 border rounded-full mt-5 mb-5'>
            <img src={assets.lock_icon} alt="" />
            <input className='outline-none' value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' />
          </div>
          {
            userState === 'Login'
            && <p className='text-base text-[#007AFF] pt-3 pb-2 cursor-pointer'>Forget Password?</p>
          }

          <button className='text-white bg-[#007AFF] rounded-full px-8 py-3 w-full cursor-pointer'>{userState}</button>
          {
            userState === 'Sign Up'
              ?
              <p className='text-[#7A7A7A] text-base pt-5'>Already have a Account? <span onClick={() => setUserState('Login')} className='text-[#007AFF] cursor-pointer'>Login</span></p>
              :
              <p className='text-[#7A7A7A] text-base pt-5'>Don’t have an account? <span onClick={() => setUserState('Sign Up')} className='text-[#007AFF] cursor-pointer'>Sign Up</span></p>
          }

        </div>

        <img onClick={() => setShowLogin(false)} src={assets.cross_icon} className='absolute top-5 right-5 cursor-pointer' alt="" />
      </motion.form>


    </div>
  )
}

export default Login