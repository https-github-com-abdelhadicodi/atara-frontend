import React from 'react'
import coriander from "../image/coriander.jpeg"
import blackpepper from "../image/Black-Pepper.jpg"
import anise from "../image/anise.jpg"
import koronfol from "../image/koronfl.jpg"
import ginger from "../image/Ginger.jpg"
import cinnamon from "../image/cinnamon.jpeg"
import saffron from "../image/Saffron.jpg"
import cumin from "../image/Cumin.jpg"
import nigella from "../image/Nigella.jpg"
import "./carousel.css"
export default function Carousel() {
  return (
    <>
  <div className="container_carousel">
		<div id="carousel">
			<figure><img className='img-carousel' src={coriander} alt=""/></figure>
			<figure><img className='img-carousel' src={blackpepper} alt=""/></figure>
			<figure><img className='img-carousel' src={anise} alt=""/></figure>
			<figure><img className='img-carousel' src={koronfol} alt=""/></figure>
			<figure><img className='img-carousel' src={ginger} alt=""/></figure>
			<figure><img className='img-carousel' src={cinnamon} alt=""/></figure>
			<figure><img className='img-carousel' src={saffron} alt=""/></figure>
			<figure><img className='img-carousel' src={cumin} alt=""/></figure>
			<figure><img className='img-carousel' src={nigella} alt=""/></figure>
		</div>
	</div>
    </>
  )
}
