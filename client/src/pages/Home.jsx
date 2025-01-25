import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Steps from '../components/Steps'
import Advertize from '../components/Advertize'
import Testinomials from '../components/Testinomials'

function Home() {
  return (
    <div className='min-h-screen'>
      <Hero />
      <Steps />
      <Advertize />
      <Testinomials />
    </div>
  )
}

export default Home