"use client";

import { getPostForFeed } from "@/lib/actions";
import React from "react";
import Card from "./card";
import LoadMoreFeed from "./loadMoreFeed";
import Loader from "./loader";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SessionInterface } from "@/app/types/types";
import { LeftSide } from "./leftSide";
import { RightSide } from "./rightSide";
import Link from "next/link";
import Image from "next/image";

function Feed({ session }: { session: SessionInterface | null }) {
  const [FeedOrCoffeeList, setFeedOrCoffeeList] = useState("feed");

  const {
    error,
    data: posts,
    isLoading,
  } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const res = await getPostForFeed(8, 0, session?.user?.id);
      return res;
    },
  });

  if (error)
    return (
      <div className="h-screen w-full">
        <div className="h-full w-full flex justify-center items-center">
          <div className="">Something went wrong</div>
        </div>
      </div>
    );

  return (
    <div className="flex flex-row">
      <div className="flex flex-1 md:justify-end">
        <LeftSide session={session} />
      </div>
      <div className="flex justify-center w-full md:max-w-xl mx-auto">
        <div className="w-full h-full flex flex-col justify-center items-center border-0 md:border-x-[1px] border-neutral-700 dark:border-neutral-400">
          <div className="w-full flex flex-col border-b-[1px] border-neutral-700 dark:border-neutral-400 h-24 md:h-16">
            <Link
              href={"/"}
              className="w-full flex justify-center pt-2 md:hidden"
            >
              <Image src={"/coffee.png"} alt={"logo"} width={24} height={24} />
            </Link>
            <div className="grid grid-cols-2 items-end h-full pb-2">
              <div className="w-full flex justify-center items-center cursor-pointer">
                <button
                  className={`font-light text-lg md:text-xl w-32 py-2 hover:w-40 transition-width duration-100
						 ${
               FeedOrCoffeeList === "feed"
                 ? "border-orange-500 border-b-[1px]"
                 : "border-neutral-400 border-b-[1px]"
             }`}
                  onClick={() => setFeedOrCoffeeList("feed")}
                >
                  Feed
                </button>
              </div>
              <div className="w-full flex justify-center items-center cursor-pointer">
                <button
                  className={`font-light text-lg md:text-xl w-32 py-2 hover:w-40 transition-width duration-100
					${
            FeedOrCoffeeList === "coffees"
              ? "border-orange-500 border-b-[1px]"
              : "border-neutral-400 border-b-[1px]"
          }`}
                  onClick={() => setFeedOrCoffeeList("coffees")}
                >
                  Coffees
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            {isLoading ? (
              <div className="h-screen flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              posts?.map((post) => (
                <div key={post.id}>
                  <Card
                    author={post.author?.name}
                    avatar={post.author?.avatar}
                    id={post.id}
                    title={post.title}
                    brand={post.brand}
                    rate={post.rate}
                    session={session}
                    createdAt={post.createdAt}
                    tasting={post.tasting}
                    clickable={true}
                    imageUrl={post.imageUrl}
                    country={post?.country}
                    isSaved={post.isSaved}
                  />
                </div>
              ))
            )}
          </div>
          <div className=" flex justify-center items-center w-full h-full">
            <LoadMoreFeed session={session} />
          </div>
        </div>
      </div>
      <div className="flex flex-1 justify-start">
        <RightSide session={session} />
      </div>
    </div>
  );
}

export default Feed;
