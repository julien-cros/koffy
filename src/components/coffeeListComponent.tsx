"use client";

import React from "react";
import Card from "./card";
import type { PostInterface } from "@/app/types/types";
import Link from "next/link";
import PushBackButton from "./pushBackButton";
import type { SessionInterface } from "@/app/types/types";
import { LeftSide } from "./leftSide";
import { RightSide } from "./rightSide";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

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
      <div className="flex w-full max-w-xl mx-auto min-h-screen">
        <div className="flex flex-col w-full border-x-[1px] border-neutral-700 dark:border-neutral-400">
          <div className="h-24 w-full border-b-[1px] border-neutral-700 dark:border-neutral-400">
            <div className="md:hidden flex justify-between items-center w-full p-2">
              {session?.user.id ? (
                <Link href={`/profile/${session.user.name}`}>
                  <img
                    src={session?.user.avatar}
                    alt="avatarFeed"
                    className="h-6 w-6 rounded-full cursor-pointer"
                  />
                </Link>
              ) : (
                <div className="h-6 w-6"></div>
              )}
              <img src="/coffee.png" alt="logoFeed" className="h-6 w-6" />
              <Cog6ToothIcon className="h-6 w-6" />
            </div>
            <div className="h-full flex flex-row items-center gap-2 pb-10 md:pb-0 pl-2">
              <PushBackButton />
              <p className="font-light text-lg md:text-xl">My Coffee List</p>
            </div>
          </div>
          <div className="flex flex-col p-4 md:p-2 space-y-4 md:space-y-2">
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
            {!posts && (
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
