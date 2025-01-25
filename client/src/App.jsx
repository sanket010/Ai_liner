import React, { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Navbar from './components/Navbar'
import Result from './pages/Result'
import Footer from './components/Footer'
import Login from './pages/Login'
import { AppContext } from './context/AppContext'

function App() {
  const { showLogin, setShowLogin } = useContext(AppContext)

  return (
    <div className='px-4 sm:px-12 md:px-24 lg:px-48 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50 '>
      <Navbar />
      {
        showLogin &&
        <Login />
      }
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/result' element={<Result />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
