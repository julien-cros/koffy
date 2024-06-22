"use client";

import React from "react";
import Card from "./card";
import type { PostInterface } from "@/app/types/types";
import type { SessionInterface } from "@/app/types/types";
import { LeftSide } from "./leftSide";
import { RightSide } from "./rightSide";
import { DefaultHeader } from "./defaultHeader";
import LoadMorePost from "./loadMorePost";

type Props = {
  posts?: PostInterface[] | null;
  isLogged: boolean;
  session: SessionInterface | null;
};

const CoffeeListComponent = ({ posts, session }: Props) => {
  return (
    <div className=" flex flex-row z-10">
      <div className="flex flex-1 md:justify-end">
        <LeftSide session={session} />
      </div>
      <div className="flex w-full md:max-w-xl mx-auto min-h-screen">
        <div className="flex flex-col w-full border-0 md:border-x-[1px] border-neutral-700 dark:border-neutral-400">
          <DefaultHeader title="My Coffee List" />
          <div className="flex flex-col space-y-4 md:space-y-2 w-full">
            {posts?.map((post) => (
              <div key={post.id}>
                <Card
                  author={post.author?.name}
                  avatar={post.author?.avatar}
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
            {!posts ? (
              <Card
                author={"future Author"}
                avatar={"images/default-profile.svg"}
                key={0}
                title="No coffee yet"
                brand="future Brand"
                tasting="Taste a  coffe and rate it"
                rate={4}
                createdAt={new Date()}
                id=""
                clickable={false}
                imageUrl={""}
                country={""}
              />
            ) : (
              <LoadMorePost authorId={session?.user.id} session={session} />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-1 justify-start">
        <RightSide session={session} />
      </div>
    </div>
  );
};

export default CoffeeListComponent;
