import React from 'react'
import Footer from '../components/ui/Footer'
import StudentHeader from '../components/student/StudentHeader'
import { Outlet } from 'react-router-dom'

function StudentLayout() {
  return (
    <>
      <header>
        <StudentHeader/>
      </header>
      <Outlet/>
      <footer>
        <Footer/>
      </footer>
    </>
  )
}

export default StudentLayout