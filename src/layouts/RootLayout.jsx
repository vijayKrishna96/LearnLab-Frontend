import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer'

function RootLayout() {
  return (
    <>
    <header>
        <Navbar/>
    </header>
    <Outlet/>
    <footer>
        <Footer/>
    </footer>
    </>
  )
}

export default RootLayout