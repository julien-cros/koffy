"use client";

import React from "react";
import Card from "./card";
import { useRouter } from "next/navigation";
import type { PostInterface } from "@/app/types/types";
import { useState } from "react";
import type { SessionInterface } from "@/app/types/types";

type DisplayCardsProps = {
  post: PostInterface[] | undefined | null;
  session: SessionInterface | null;
};

// TODO: Implement the DisplayCards componentwith the button because it is not working
const DisplayCards = ({ post, session }: DisplayCardsProps) => {
  const router = useRouter();
  const [State] = useState(false);

  const handleClick = (id: string, setState: boolean) => {
    if (!setState) router.push(`/coffee-list/${id}`);
  };

  return (
    <div className="pt-10 flex flex-col justify-items-center p-4 md:p-2 space-y-4 md:space-y-2 pb-10">
      {post?.map((post) => (
        <div key={post.id} onClick={() => handleClick(post.id, State)}>
          <Card
            key={post.id}
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
      {!post && (
        <p className="h-screen flex justify-center items-center text-lg md:text-xl lg:text-2xl">
          Nothing Found
        </p>
      )}
    </div>
  );
};

export default DisplayCards;
