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
    <div className="mt-20 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-items-center gap-10 pb-10">
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
          />
        </div>
      ))}
      {!post && (
        <p className="flex justify-center items-center text-lg md:text-xl lg:text-2xl">
          Nothing Found
        </p>
      )}
    </div>
  );
};

export default DisplayCards;
