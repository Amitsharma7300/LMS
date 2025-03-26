import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className='flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0'>
      <h1 className='text-xl md:text-4xl text-gray-800'>Learn anything, anytime, anywhere</h1>
      <p class='text-gray-500 sm:text-sm'> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam laudantium incidunt explicabo, delectus dolorem corrupti similique placeat. Ipsam reiciendis sunt quam nostrum at expedita itaque dolorem! Veniam eum sit ex!</p>
      <div className='flex items-center font-medium gap-6 mt-4'>
        <button className='px-10 py-3 rounded-md tex-white bg-blue-600'>Get started</button>
        <button className='flex items-center gap-2'>Learn more <img src={assets.arrow_icon} alt='arrow_icon'/> </button>
      </div>
    </div>
  )
}

export default CallToAction