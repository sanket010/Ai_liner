import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'


import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

function Navbar() {

  const { showLogin, setShowLogin, token, setToken, credits, setCredits, user, setUser } = useContext(AppContext)
  const handleLogout = () => {
    navigate('/')
    setShowLogin(true)
    localStorage.removeItem("token")
    setToken("")

  }

  const navigate = useNavigate()
  return (
    <div className=''>
      <div className='flex justify-between py-6  items-center'>
        <div>
          <NavLink to='/'>
            <img className='cursor-pointer h-28' src={assets.logo} alt="" />
          </NavLink>
        </div>
        <div>
          {
            token ?
              <div className='flex max-sm:gap-2 gap-8'>
                <NavLink to='/pricing' className='flex gap-1 items-center bg-blue-100 px-4 rounded-full py-1.5 cursor-pointer hover:scale-105 transition-all duration-700 '>
                  <img width={20} src={assets.credit_star} alt="" />
                  <p className='max-sm:hidden text-gray-600'>Credits left : </p>
                  <p className='text-gray-600'>{credits}</p>
                </NavLink>
                <div className='flex gap-2 items-center'>
                  <p className='max-sm:hidden'>Hi, {user.name}</p>
                  <div className='relative group '>
                    <img className='cursor-pointer drop-shadow-' width={36} src={assets.profile_icon} alt="" />
                    <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12 '>
                      <ul>
                        <li onClick={handleLogout} className='cursor-pointer'>Logout</li>
                      </ul>


                    </div>
                  </div>
                </div>
              </div>
              :
              <div className='flex max-sm:gap-2 gap-8 items-center '>
                <p onClick={() => navigate('/pricing')} className='max-sm:hidden text-base cursor-pointer'>Pricing</p>
                <button onClick={() => setShowLogin(true)} className='bg-gray-800 text-white px-8 py-1.5 rounded-full cursor-pointer'>Login</button>
              </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar