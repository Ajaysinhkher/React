import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router'

function Layout() {
  return (
    <>
    <Header/>
    {/* The <Outlet> component is a placeholder within a parent route's component that tells React Router where to render the child routes. It acts like a dynamic container that changes its content based on the current URL */}
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout