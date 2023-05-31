import React from 'react'
import "./aboutUs.css"
import logoAtara from "../../Components/image/logoatara-removebg.png"

export default function aboutUs() {
  return (
    <main class="main-grid">
            <div class="head">
            <h1 class="page-title">About us</h1>
            <p class="subtitle">The aim of this website is to improve information for users.</p>
            </div>
            <img class="main-image" src={logoAtara} alt='logo'/>
            
            <div class="main-text">
                <h2 class="section-title">Website content</h2>
                <p>This site contains many products such as spices, herbs, and dates.  </p>
                <p>Each product has its own characteristics, including information about the product and ingredients, how to use it, and some notes.</p>
              
                
            </div>
      
    </main>
  )
}
