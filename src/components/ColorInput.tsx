'use client';

import React, { useState } from 'react'

const colors = [
	{ id: 1, name: 'bg-[#f5f0e6]' },
	{ id: 2, name: 'bg-[#E7D9D3]' },
	{ id: 3, name: 'bg-[#F0E4D9]' },
	{ id: 4, name: 'bg-[#EAE6DB]' },
	{ id: 5, name: 'bg-[#F6EDEA]' },
	{ id: 6, name: 'bg-[#EBDACA]' },
  ]

type Props = {
	color: string;
	setState: (value: string) => void;
}

const ColorInput = ({setState, color}: Props) => {
	const [selected, setSelected] = useState({ name: color })
  return (
	<div className='w-52 h-20 flex flex-row items-center justify-start gap-2'>
			{colors.map((color) => (
				<div key={color.id} 
					 className={`w-[29px] h-[29px] flex justify-center items-center border-2 ${color.name === selected.name ? "border-slate-400" : "border-slate-300"} rounded-lg hover:border-slate-400`}>
					<div
						className={`w-5 h-5 z-0 rounded-[5px] ${color.name} active:scale-125 transition duration-150 ${color.name === selected.name ? "scale-125" : ""}`}
						onClick={() => {
							setSelected(color)
							setState(color.name)
						}}
					></div>
				</div>
			))}
		
	</div>
  )
}

export default ColorInput