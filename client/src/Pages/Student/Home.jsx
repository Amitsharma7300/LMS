import React from 'react'
import Hero from '../../components/Student/Hero'
import CoursesList from './CoursesList'
import CourseSection from '../../components/Student/CourseSection'
import Companies from '../../components/Student/Companies'
import TestimonialSections from '../../components/Student/TestimonialSections'
import CallToAction from '../../components/Student/CallToAction'
import Footer from '../../components/Student/Footer'

const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
        <Hero/>
        <Companies/>
        <CourseSection/>
        <TestimonialSections/>
        <CallToAction/>
        <Footer/>
        </div>
  )
}
export default Home