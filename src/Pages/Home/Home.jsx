import React from 'react'
import Welcome from '../Welcome/Welcome'
import Masonry from '../Masonry/Masonry'
import ServerStatics from '../ServerStatics/ServerStatics'
import { Helmet } from 'react-helmet'
import Carousal from '../Carousal/Carousal'

function Home({darkMode}) {
  return (
    <>
    <Helmet>
        <title>Home Page</title>
        <meta name="description" content="Welcome to my website" />
        {/* Add more meta tags as needed */}
      </Helmet>
    <Welcome darkMode={darkMode}/>
    <Masonry/>
    <ServerStatics/>
    <Carousal/>
    </>
  )
}

export default Home
