'use client'

import Card from './Card'
import React from 'react'
import dynamic from 'next/dynamic'
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { coffeDsisplay } from '@/constant';

const DisplayCard = () => {
	const OwlCarousel = dynamic(
		() => import('react-owl-carousel'),
		{ ssr: false }
	);

// 	window.$ = jQuery;
// 	var $ = require('jquery.js');
// if (typeof window !== "undefined") {
// window.$ = window.jQuery = require("jquery");
// }

	const options = {
		loop: true,
		nav: false,
		dots: true,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
		items: 1,
		singleItem: true,
		touchDrag: true,
	};


  return (
	<div className='h-[500px] lg:h-[100%] w-full'>
		<div className='flex  h-full items-center justify-center overflow-hidden'>
			<OwlCarousel className='owl-theme' {...options}>
				{coffeDsisplay.map((coffee) => (
					<div key={coffee.title}  className='flex h-full justify-center mb-10'>
						<Card
							key={coffee.title}
							title={coffee.title}
							brand={coffee.brand}
							tasting={coffee.tasting}
							rate={coffee.rate}
							updatedAt={coffee.updatedAt}
							shadow={"shadow-xl"}
						/>
					</div>
				))}
				</OwlCarousel>
		</div>
	</div>
  )
}



export default DisplayCard