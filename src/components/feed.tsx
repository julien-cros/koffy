"use client";

import { getPostForFeed } from "@/lib/actions";
import React from "react";
import Card from "./card";
import LoadMore from "./loadMore";
import Loader from "./loader";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function Feed() {
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
    <div className="w-full h-full flex flex-col justify-center items-center z-50">
      <div className="w-full grid grid-cols-2 border-b-[1px] border-neutral-700 dark:border-neutral-400 h-24">
        <div className="w-full h-full flex justify-center items-center cursor-pointer">
          <button
            className={`text-lg w-32 py-2 hover:w-40 transition-width duration-100
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
        <div className="w-full h-full flex justify-center items-center cursor-pointer">
          <button
            className={`text-lg w-32 py-2 hover:w-40 transition-width duration-100
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
      <div className="flex flex-col p-2  space-y-2">
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
                session={null}
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
        <LoadMore />
      </div>
    </div>
  );
}

export default Feed;
