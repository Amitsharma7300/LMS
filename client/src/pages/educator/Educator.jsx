import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Educator/Navbar'
import Sidebar from '../../components/Educator/Sidebar'
import Footer from '../../components/educator/Footer'

const Educator = () => {
  return (
    <div className=' text-defaultmin-h-screen bg-white'>
  <Navbar/>
  <div className='flex'>
    <Sidebar/>
    <div className='flex-1'>
    <Outlet/>
    </div>
  
    </div>
    <Footer/>
    </div>
    )
}

export default Educator 