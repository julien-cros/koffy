"use client";

// import { ChevronDownIcon } from '@heroicons/react/24/solid';
// import React, { useState } from 'react'

// type Props = {
// 	setCategorySearch: (type: string) => void;
// }

// const CategorySearchBar = ({ setCategorySearch }: Props) => {
// 	const [clicked, setClicked] = useState(false);
// 	const [category, setCategory] = useState("brand");

//   return (
// 	<div className={`flex justify-center`}
// 	onClick={() => setClicked(!clicked)}
// 	>
// 		<button 
// 			className={`
// 			${clicked ? "rounded-t-md border-[1px]" : "border-[1px] rounded-md"}
// 			flex items-center justify-center w-[100px] py-2 bg-white`}
// 			onClick={() => setClicked(!clicked)}>
// 			{category}
// 			<ChevronDownIcon className={`w-5 h-5 ml-2  ${clicked ? "rotate-180 transition-all" : "trasnition-all"}`} />
// 		</button>
// 		<div className={`
// 			${clicked ? "block" : "hidden"}
// 			mt-10 absolute flex flex-col justify-center bg-white rounded-b-md`}
// 			onClick={() => setClicked(!clicked)}
// 			>
// 			<button className='w-[100px] border-x-[1px] border-t-[1px] py-2' onClick={() => setCategory("brand")}>brand</button>
// 			<div className='flex justify-center'><div className='w-1/2 flex justify-center items-center border-b-[1px]'/></div>
// 			<button className='w-[100px] border-x-[1px] py-2' onClick={() =>  {setCategory("variety"); setCategorySearch("variety")}}>variety</button>
// 			<div className='flex justify-center'><div className='w-1/2 flex justify-center items-center border-b-[1px]'/></div>
// 			<button className='w-[100px] border-x-[1px] py-2' onClick={() =>  {setCategory("tasting"); setCategorySearch("tasting")}}>tasting</button>
// 			<div className='flex justify-center'><div className='w-1/2 flex justify-center items-center border-b-[1px]'/></div>
// 			<button className='w-[100px] border-x-[1px] py-2' onClick={() =>  {setCategory("rate"); setCategorySearch("rate")}}>rate</button>
// 			<div className='flex justify-center'><div className='w-1/2 flex justify-center items-center border-b-[1px]'/></div>
// 			<button className='w-[100px] border-x-[1px] py-2' onClick={() =>  {setCategory("note"); setCategorySearch("note")}}>note</button>
// 			<div className='flex justify-center'><div className='w-1/2 flex justify-center items-center border-b-[1px]'/></div>
// 			<button className='w-[100px] border-x-[1px] border-b-[1px] rounded-b-md py-2 ' onClick={() => {setCategory("price"); setCategorySearch("price")}}>price</button>
// 		</div>
// 	</div>
//   )
// }

// export default CategorySearchBar


type Props = {
	setCategorySearch: (type: string) => void;
}

import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const category = [
  { name: 'Brand' },
  { name: 'Title' },
  { name: 'Variety' },
  { name: 'rate' },
  { name: 'price' },
  { name: 'tasting' },
  { name: 'note' },
]

export default function CategorySearchBar({setCategorySearch}: Props) {
  const [selected, setSelected] = useState(category[0])
 
  return (
    <div className="w-32">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus-visible:ring-offset-gray-100 focus:outline-none sm:text-sm">
              {category.map((categoryItem, categotyIndex) => (
                <Listbox.Option
                  key={categotyIndex}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-5 ${
                      active ? 'bg-pale-red text-amber-900' : 'text-gray-900'
                    }`
                  }
				  onClick={() => setCategorySearch(categoryItem.name)}
                  value={categoryItem}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {categoryItem.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-800">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
