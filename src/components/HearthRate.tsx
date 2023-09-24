import React from 'react'
import { HeartIcon } from "@heroicons/react/24/solid";

type HearthRateProps = {
	  rate: number | null;
}

const HearthRate = ({rate}: HearthRateProps) => {
	if (!rate)
		rate = 0
  return (
	<div className='flex flex-row'>
		<HeartIcon
			width={20}
			height={20}
			className={`${rate >= 1 ? "text-red-500" : "text-gray-400"}`}
		/>
		<HeartIcon
			width={20}
			height={20}
			className={`${rate >= 2 ? "text-red-500" : "text-gray-400"}`}
		/>
		<HeartIcon
			width={20}
			height={20}
			className={`${rate >= 2 ? "text-red-500" : "text-gray-400"}`}
		/>
		<HeartIcon
			width={20}
			height={20}
			className={`${rate >= 4 ? "text-red-500" : "text-gray-400"}`}
		/>
		<HeartIcon
			width={20}
			height={20}
			className={`${rate >= 5 ? "text-red-500" : "text-gray-400"}`}
		/>
	</div>
  )
}

export default HearthRate