"use client";

import { ChevronDownIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react'

type Props = {
	setCategorySearch: (type: string) => void;
}

const CategorySearchBar = ({ setCategorySearch }: Props) => {
	const [clicked, setClicked] = useState(false);
	const [category, setCategory] = useState("brand");
	setCategorySearch(category);


  return (
	<div className={`flex justify-center`}>
		<button 
			className={`
			${clicked ? "rounded-t-md border-[1px]" : "border-[1px] rounded-md"}
			flex items-center justify-center w-[100px] py-2 bg-white`}
			onClick={() => setClicked(!clicked)}>
			{category}
			<ChevronDownIcon className={`w-5 h-5 ml-2 transform ${clicked ? "rotate-180" : ""}`} />
		</button>
		<div className={`
			${clicked ? "block" : "hidden"}
			mt-10 absolute flex flex-col bg-white rounded-b-md`}
			onClick={() => setClicked(!clicked)}
			>
			<button className='w-[100px] border-x-[1px] border-t-[1px] py-2' onClick={() => setCategory("brand")}>brand</button>
			<button className='w-[100px] border-x-[1px] py-2' onClick={() =>  setCategory("variety")}>variety</button>
			<button className='w-[100px] border-x-[1px] py-2' onClick={() =>  setCategory("tasting")}>tasting</button>
			<button className='w-[100px] border-x-[1px] py-2' onClick={() =>  setCategory("rate")}>rate</button>
			<button className='w-[100px] border-x-[1px] py-2' onClick={() =>  setCategory("note")}>note</button>
			<button className='w-[100px] border-x-[1px] border-b-[1px] rounded-b-md py-2' onClick={() => setCategory("price")}>price</button>
		</div>
	</div>
  )
}

export default CategorySearchBar


{/* <select
			className="hidden sm:hidden md:block placeholder-gray-400 text-sm rounded-lg px-5 py-2 ring-1 outline-none ring-gray-200 hover:ring-gray-300 focus:ring-2 focus:ring-gray-400"
			onChange={(e) => setCategorySearch("brand", e.target.value)}
		>
			<option value="brand">Brand</option>
			<option value="model">Model</option>
			<option value="year">Year</option>
			<option value="rate">Rate</option>
		</select> */}