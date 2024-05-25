import React from "react";
import { findSearchPost } from "../actions";
import PushBackButton from "@/components/pushBackButton";
import DisplayCards from "@/components/renderCards";
import { getCurrentUser } from "@/lib/actions";
import { RightSide } from "@/components/rightSide";
import { LeftSide } from "@/components/leftSide";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type PageProps = {
  params: {
    id: string;
  };
};

const SearchPage = async ({ params }: PageProps) => {
  const session = await getCurrentUser();

  const key = params.id.split("-")[0];
  const value = params.id.split("-")[1];
  const isPrivate = params.id.split("-")[2];

  const MyValue = key === "rate" ? Number.parseInt(value) : value;
  const posts = await findSearchPost(key, MyValue, isPrivate);

  return (
    <div className=" flex flex-row min-h-screen">
      <div className="flex flex-1 justify-end">
        <LeftSide session={session} />
      </div>
      <div className="flex justify-center w-full max-w-xl mx-auto">
        <div className="w-full h-full flex flex-col justify-center items-center z-50 border-x-[1px] border-neutral-700 dark:border-neutral-400">
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
            <div className="h-full flex w-full flex-row items-center pb-10 md:pb-0 pl-2 gap-2">
              <PushBackButton />
              <p className="font-light text-lg md:text-xl">Results</p>
            </div>
          </div>
          <DisplayCards post={posts} session={session} />
        </div>
      </div>
      <div className="flex flex-1 justify-start">
        <RightSide session={session} />
      </div>
    </div>
  );
};

export default SearchPage;
