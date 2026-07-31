import React from 'react'
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import LatestCollection from "./components/LatestCollection"
import BestSeller from "./components/BestSeller"
import OurPolicy from "./components/OurPolicy"
import NewsLetterBox from "./components/NewsletterBox"
import Footer from "./components/Footer"

const page = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      <NewsLetterBox/>
      <Footer/>
    </div>
  )
}

export default page