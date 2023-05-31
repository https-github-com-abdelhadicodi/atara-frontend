import React from 'react'
import Footer from '../../Components/footer/footer.js';
import Navbar from '../../Components/navbar/navbar.js';
import { Outlet } from 'react-router-dom';


export default function Visitor() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}
