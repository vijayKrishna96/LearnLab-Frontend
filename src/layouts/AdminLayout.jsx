import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <>
    <header></header>
    <Outlet/>
    <footer></footer>
    </>
  )
}

export default AdminLayout