import React from 'react'
import Carousel from '../../Components/carousel/carousel'
import CategoryDesign from '../../Components/categoryDesign/categoryDesign.js'
import NewProduct from '../../Components/newProduct/newProduct.js'
import CategorySwip from '../../Components/categorySwip/CategorySwip'
export default function HomePage() {
  return (
    <>
    {/* <Carousel/> */}
    <NewProduct/>
    <CategorySwip/>
    <CategoryDesign/>
    
    </>
  )
}
