"use client";

import { getPostForFeed } from "@/lib/actions";
import React from "react";
import Card from "./card";
import LoadMore from "./loadMore";
import Loader from "./loader";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SessionInterface } from "@/app/types/types";
import { LeftSide } from "./leftSide";
import { RightSide } from "./rightSide";
import Link from "next/link";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

function Feed({ session }: { session: SessionInterface | null }) {
  const [FeedOrCoffeeList, setFeedOrCoffeeList] = useState("feed");

  const {
    error,
    data: posts,
    isLoading,
  } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const res = await getPostForFeed(8, 0);
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
          <div className="w-full flex flex-col border-b-[1px] border-neutral-700 dark:border-neutral-400 h-24">
            <div className="md:hidden flex justify-between items-center w-full p-2">
              {session?.user.id ? (
                <Link href={`profile/${session.user.name}`}>
                  <img
                    src={session?.user.avatar}
                    alt="avatarFeed"
                    className="h-6 w-6 rounded-full cursor-pointer"
                  />
                </Link>
              ) : (
                <div className="h-6 w-6"></div>
              )}
              <Link href={"/"}>
                <img src="/coffee.png" alt="logoFeed" className="h-6 w-6" />
              </Link>
              <Link href={"/settings"}>
                <Cog6ToothIcon className="h-6 w-6" />
              </Link>
            </div>
            <div className="grid grid-cols-2 h-full">
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
          <div className="flex flex-col p-4 md:p-2 space-y-4 md:space-y-2">
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
                  />
                </div>
              ))
            )}
          </div>
          <div className=" flex justify-center items-center">
            <LoadMore session={session} />
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
