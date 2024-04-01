import React from 'react'
import Navbar from '../Components/LandingPage/LandingPageHeader/LandingPageHeader'
import Search from '../Components/LandingPage/LandingPageSearch/LandingPageSearch'
import Card from '../Components/LandingPage/LandingPageCard/LandingPageCard'
import Gallery from '../Components/LandingPage/LandingPageDestination/LandingPageDestination'
import Footer from '../Components/LandingPage/LandingPageFooter/LandingPageFooter'
import Subscription from '../Components/LandingPage/LandingPageSubscribe/LandingPageSubscribe'

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Search />
      <Card />
      <Gallery />
      <Subscription />
      <Footer />
    </>
  )
}

export default LandingPage