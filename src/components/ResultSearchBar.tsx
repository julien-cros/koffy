"use client"

import React from 'react'
import type { PostInterface } from './ExpandedCard'
import Card from './Card';
import { useRouter } from 'next/navigation';

type Props = {
	setIsSearchOpen: (isOpen: boolean) => void;
	posts: PostInterface[] | null;
}

const ResultSearchBar = ({ setIsSearchOpen, posts }: Props) => {
	const router = useRouter();

	const redircetion = (id: string) => {
		router.push(`/coffee-list/${id}`)
	}
  return (
	<div className='h-full w-full flex justify-center items-center sticky '
		onClick={() => setIsSearchOpen(false)}	
	>
		<div className='absolute  grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-center' >
			{posts?.map((post) => (
				<div key={post.id} className='flex justify-center p-5	' onClick={() => redircetion(post.id)}>
					< Card 
						title={post?.title}
						brand={post?.brand}
						tasting={post?.tasting}
						updatedAt={post?.updatedAt}
						rate={post?.rate}
					/>
				</div>
			))}
		</div>
	</div>
  )
}

export default ResultSearchBar