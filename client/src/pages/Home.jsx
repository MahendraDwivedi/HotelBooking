import React from 'react'
import Hero from '../components/Hero'
import FeaturedDestination from '../components/FeaturedDestination'
import ExclusiveOffers from '../components/ExclusiveOffers'
import Testimonials from '../components/Testimonials'
import NewsLetter from '../components/NewsLetter'

const Home = () => {
  return (
    <div>
      <Hero/>
      <FeaturedDestination/>
      <ExclusiveOffers/>
      <Testimonials/>
      <NewsLetter/>
    </div>
  )
}

export default Home
