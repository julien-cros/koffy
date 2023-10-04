"use Client";

// import React, { useState } from 'react'
// import CategorySearch from './CategorySearch';
// import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
// import { findPosts } from '@/lib/actions';
import { SessionInterface } from '@/lib/session';
// import { redirect } from 'next/navigation';
// import { useRouter } from "next/navigation";
// import ResultSearchBar from './ResultSearchBar';

type Props = {
	session: SessionInterface | null;
  };

const BaseSearchBar = ({session}: Props) => {
	void session;
	// const [search, setsearch] = useState("");
	// const router = useRouter();
	// const categorySearch = "brand";


  return (
	<div className='w-full h-full flex justify-center'>
		<input
            type="text"
            placeholder="Search..."
            className="w-1/2 hidden sm:hidden md:block placeholder-gray-400 text-sm rounded-lg px-5 py-2 ring-1 outline-none ring-gray-200 hover:ring-gray-300 focus:ring-2 focus:ring-gray-400"
			// onChange={(e) => setsearch(e.target.value)}
          />
		 {/* <button > brand</button> */}
		  {/* <MagnifyingGlassIcon className="w-10 h-8 sm:hidden md:block cursor-pointer hover:scale-105 transition duration-150 active:scale-95"  */}
		{/* //   onClick={handleSearch} */}
		  {/* /> */}
	</div>
  )
}

export default BaseSearchBar;