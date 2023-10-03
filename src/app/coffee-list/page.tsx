import Card from "@/components/Card";
import { getUserPosts } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session";
import { ArrowLeftIcon, SquaresPlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";



export default async function CoffeeListPage() {
  const session = await getCurrentUser();
  var posts = null;

  if (session) {
    posts = await getUserPosts(session?.user?.id);
  }
  return (
    <div className="flex flex-col justify-center m-10">
      <div className="grid grid-cols-2 items-center">
		<div className="flex flex-row items-center gap-2">
			<Link href={"/"}>
				<ArrowLeftIcon
					height={30}
					width={30}
					className="cursor-pointer hover:scale-105 transition duration-150 active:scale-95"
				/>
			</Link>
        <p
          className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tl from-yellow-900 from-50% to-rose-300"
        >
          My coffee list
        </p>
		</div>
        <div className="flex justify-end mr-0 md:mr-5 lg:mr-10 xl:mr-10">
          <Link href="/create-card">
            <SquaresPlusIcon className="w-10 h-10  text-yellow-800 cursor-pointer hover:scale-105 transition duration-150 active:scale-95 " />
          </Link>
        </div>
      </div>
      <div className="mt-20 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-items-center gap-10">
        {posts?.map((post) => (
          <Link href={`/coffee-list/${post.id}`} key={post.id}>
            <Card
              key={post.id}
              title={post?.title}
              brand={post?.brand}
              tasting={post?.tasting}
              updatedAt={post.updatedAt}
              rate={post?.rate}
            />
          </Link>
        ))}
        {!posts && (
          <Card
            key={0}
            title="No coffee yet"
            brand="future Brand"
            tasting="Taste a  coffe and rate it"
            rate={4}
            updatedAt={new Date()}
          />
        )}
      </div>
    </div>
  );
}
