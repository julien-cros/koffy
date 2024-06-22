"use client";

import React from "react";
import Card from "./card";
import { useRouter } from "next/navigation";
import type { PostInterface } from "@/app/types/types";
import type { SessionInterface } from "@/app/types/types";
import LoadMoreResults from "./loadMoreResults";
import Loader from "./loader";

type DisplayCardsProps = {
  post: PostInterface[] | undefined | null;
  session: SessionInterface | null | undefined;
  category: string;
  MyValue: string | number;
  isPrivate: string;
  isLoading: boolean;
};

// TODO: Implement the DisplayCards componentwith the button because it is not working
const DisplayCards = ({
  post,
  session,
  category,
  MyValue,
  isPrivate,
  isLoading,
}: DisplayCardsProps) => {
  const router = useRouter();

  return (
    <div className=" flex flex-col justify-items-center space-y-4 md:space-y-2 pb-10 w-full">
      {post?.map((post) => (
        <div
          key={post.id}
          onClick={() => router.push(`/coffee-list/${post.id}`)}
        >
          <Card
            key={post.id}
            author={post?.author?.name}
            title={post.title}
            brand={post.brand}
            tasting={post?.tasting}
            createdAt={post?.createdAt}
            rate={post.rate}
            id={post.id}
            session={session}
            clickable={true}
            imageUrl={post?.imageUrl}
            country={post?.country}
            avatar={post?.author?.avatar}
          />
        </div>
      ))}
      {!post || post.length === 0 ? (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <p className=" flex justify-center items-center text-lg">
              Nothing Found
            </p>
          )}
        </>
      ) : (
        <LoadMoreResults
          category={category}
          MyValue={MyValue}
          isPrivate={isPrivate}
          session={session}
        />
      )}
    </div>
  );
};

export default DisplayCards;
