import Card from "@/components/Card";
import { getUserPosts } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session";
import { SquaresPlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";

// type updateFormState = {
// 	title: string | null;
// 	brand: string | null;
// 	variety: string | null;
// 	tasting: string | null;
// 	rate: number | null;
// 	note: string | null;
// 	price: string | null;
// }


export default async function CoffeeListPage() {
	const session = await getCurrentUser();
	var posts = null;

	if (session)
	{
		posts = await getUserPosts(session?.user?.id);
	}
  return (
    <div className="items-center m-10">
      <div className="grid grid-cols-2 items-center">
        <Link
          href="/coffee-list"
          className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tl from-yellow-900 from-50% to-rose-300"
        >
          My coffee list
        </Link>
        <div className="flex justify-end mr-0 md:mr-5 lg:mr-10 xl:mr-10">
          <Link href="/create-card">
            <SquaresPlusIcon className="w-10 h-10  text-yellow-800 cursor-pointer hover:scale-105 transition duration-150 active:scale-95 " />
          </Link>
        </div>
      </div>
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
       {posts?.map((post) => (
			 <Card
			 	key={post.id}
				title={post.title}
				brand={post?.brand}
				tasting={post?.tasting}
				updatedAt={post.updatedAt}
				rate={post?.rate}
			 /> 
	      ))}
		 {/* <Card/>
		 <Card/>
		 <Card/>
		 <Card/> */}

      </div>
    </div>
  );
}
