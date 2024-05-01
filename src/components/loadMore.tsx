"use client";

import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getPostForFeed } from "@/lib/actions";
import { PostInterface } from "@/app/types/types";
import Loader from "./loader";
import Card from "./card";

let increment = 1;

export default function LoadMore() {
  const { ref, inView } = useInView();
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchData = async () => {
    if (inView) {
      setHasNextPage(true);
      try {
        const res = await getPostForFeed(8 * increment, 8 * increment);
        setPosts((prevPosts) => [...prevPosts, ...res]);
        if (res.length === 0) {
          setTimeout(() => {
            setHasNextPage(false);
          }, 1000);
        }
        increment++;
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [inView]);

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
            imageUrl={post?.imageUrl}
            country={post?.country}
          />
        </div>
      ))}
      <div className="flex" ref={ref}>
        {inView && hasNextPage && <Loader />}
      </div>
    </div>
  );
}
