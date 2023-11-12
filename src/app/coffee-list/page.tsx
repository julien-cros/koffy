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
      <div className="flex  justify-between items-center">
		<div className="flex flex-row items-center gap-2">
			<Link href={"/"}>
				<ArrowLeftIcon
					className="w-5 h-5 md:w-7 md:h-7 lg:w-10 lg:h-10  cursor-pointer hover:scale-105 transition duration-150 active:scale-95"
				/>
			</Link>
        <p
          className="text-2xl md:text-3xl lg:text-5xl flex flex-grow font-extrabold text-transparent bg-clip-text bg-gradient-to-tl from-yellow-900 from-50% to-rose-300"
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
              createdAt={post?.createdAt}
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
            createdAt={new Date()}
          />
        )}
      </div>
    </div>
  );
}
