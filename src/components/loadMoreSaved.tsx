"use client";

import { getSavedPostPacked } from "@/app/saved/savedAction";
import { SavedInterface, SessionInterface } from "@/app/types/types";
import React, { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Card from "./card";
import Loader from "./loader";

export default function LoadMoreSaved({
  session,
}: {
  session: SessionInterface;
}) {
  const { ref, inView } = useInView();
  const [prevPosts, setPrevPosts] = useState<SavedInterface[]>([]);
  const [offset, setOffset] = useState(8);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchData = useCallback(async () => {
    if (inView) {
      setHasNextPage(true);
      try {
        const res = await getSavedPostPacked(session.user.id, 8, offset);
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
    <div className="flex flex-col space-y-2">
      {prevPosts?.map((saved) => (
        <div key={saved.post.id}>
          <Card
            author={saved.post.author?.name}
            avatar={saved.post.author?.avatar}
            id={saved.post.id}
            title={saved.post.title}
            brand={saved.post.brand}
            rate={saved.post.rate}
            session={session}
            createdAt={saved.post.createdAt}
            tasting={saved.post.tasting}
            clickable={true}
            imageUrl={saved.post?.imageUrl}
            country={saved.post?.country}
            isSaved={true}
          />
        </div>
      ))}
      <div className="flex" ref={ref}>
        {hasNextPage && inView && <Loader />}
      </div>
    </div>
  );
}
