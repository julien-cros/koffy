"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getPostForFeed } from "@/lib/actions";
import { PostInterface, SessionInterface } from "@/app/types/types";
import Loader from "./loader";
import Card from "./card";

export default function LoadMoreFeed({
  session,
}: {
  session: SessionInterface | null;
}) {
  const { ref, inView } = useInView();
  const [offset, setOffset] = useState(8);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchData = useCallback(async () => {
    if (inView) {
      setHasNextPage(true);
      try {
        const res = await getPostForFeed(8, offset, session?.user?.id);
        setPosts((prevPosts) => [...prevPosts, ...res]);
        if (res.length === 0) {
          setTimeout(() => {
            setHasNextPage(false);
          }, 1000);
        } else {
          setOffset((p) => p + 8);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
  }, [inView, offset, session?.user?.id]);

  useEffect(() => {
    fetchData();
  }, [inView]);

  return (
    <div className="flex flex-col w-full">
      {posts?.map((post) => (
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
            imageUrl={post?.imageUrl}
            country={post?.country}
          />
        </div>
      ))}
      <div className="flex" ref={ref}>
        {inView && hasNextPage ? (
          <div className="h-20 w-full justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div className=" flex justify-center items-center w-full h-20">
            <p className="text-sm text-neutral-700 dark:text-neutral-400">
              You reached the end
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
