'use client';

import React, { useState } from 'react'

type Props = {
	isPrivate: boolean;
	setIsPrivate: (type: boolean) => void;
}

const ButtonPrivatePublic = ({setIsPrivate, isPrivate}: Props) => {
	const [clicked, setClicked] = useState(isPrivate);

  return (
	<div className='w-20'>
		<button className={`relative w-full cursor-default rounded-lg bg-white py-2 text-center shadow-md focus:outline-none focus-visible:border-amber-800 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-slare-300 sm:text-sm`}
			onClick={() => {setClicked(!clicked) ; setIsPrivate(!clicked)}}
		>
			{clicked ? "public" : "private"}
		</button>
	</div>
  )
}

export default ButtonPrivatePublic