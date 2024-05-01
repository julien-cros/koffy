"use server";

import { getPostForFeed } from "@/lib/actions";
import React from "react";
import Card from "./card";
import LoadMore from "./loadMore";
import Loader from "./loader";

async function Feed() {
  const posts = await getPostForFeed(8, 0);

  if (!posts)
    return (
      <div className="flex-center w-full h-full ">
        {" "}
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-col gap-10">
      {posts?.map((post) => (
        <div key={post.id}>
          <Card
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
      ))}
      <div className=" flex justify-center items-center">
        <LoadMore />
      </div>
    </div>
  );
}

export default Feed;
