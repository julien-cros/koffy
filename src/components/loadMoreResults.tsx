"use client";

import React, { useCallback, useEffect, useState } from "react";
import { findSearchPostPacked } from "@/app/search-page/actions";
import Card from "./card";
import { PostInterface, SessionInterface } from "@/app/types/types";
import { useInView } from "react-intersection-observer";
import Loader from "./loader";

export default function LoadMoreResults({
  category,
  MyValue,
  isPrivate,
  session,
}: {
  category: string;
  MyValue: string | number;
  isPrivate: string;
  session: SessionInterface | null | undefined;
}) {
  const { ref, inView } = useInView();
  const [prevPosts, setPrevPosts] = useState<PostInterface[]>([]);
  const [offset, setOffset] = useState(8);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchData = useCallback(async () => {
    if (inView) {
      setHasNextPage(true);
      try {
        const res = await findSearchPostPacked(
          category,
          MyValue,
          isPrivate,
          8,
          offset
        );
        setPrevPosts((prevPosts) => [...prevPosts, ...res]);
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
    <div>
      <div className="flex flex-col space-y-4 md:space-y-2 w-full">
        {prevPosts?.map((post) => (
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
        <div className="h-20" ref={ref}>
          {hasNextPage && inView ? (
            <Loader />
          ) : (
            <div className=" flex justify-center items-center w-full h-20">
              <p className="text-sm text-neutral-700 dark:text-neutral-400">
                You reached the end
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
