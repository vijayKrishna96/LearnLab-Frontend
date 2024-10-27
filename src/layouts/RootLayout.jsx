import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/ui/Footer'
import Navbar from '../components/ui/Navbar/Navbar'

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