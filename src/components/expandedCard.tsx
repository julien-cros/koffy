"use client";

import React, { useState } from "react";
import HearthRate from "./hearthRate";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import {
  ArrowUpOnSquareIcon,
  CheckIcon,
  Cog6ToothIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import type { SessionInterface } from "@/app/types/types";
import type { PostInterface } from "@/app/types/types";
import copy from "clipboard-copy";
import { DuplicatePost } from "@/lib/actions";
import ExpandCardInput from "./expandCardInput";
import { RightSide } from "./rightSide";
import PushBackButton from "./pushBackButton";
import Link from "next/link";
import { LeftSide } from "./leftSide";

type Props = {
  post: PostInterface | null;
  id: string;
  isMine: boolean;
  session: SessionInterface | null;
};

const ExpandedCard = ({ post, id, isMine, session }: Props) => {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);

  // function refreshPage() {
  //   window.location.reload();
  // }

  const copyClipboard = (id: string) => {
    if (!navigator.clipboard) {
      copy(`${window.location.origin}` + `/coffee-list/${id}`);
    } else {
      navigator.clipboard.writeText(
        `${window.location.origin}` + `/coffee-list/${id}`,
      );
    }
    () => copyClipboard(id);
    setTimeout(() => {}, 1000);
  };

  const handleDuplicate = async (
    id: string,
    session?: SessionInterface | null,
  ) => {
    console.log("Duplicate button clicked");
    if (!session?.user.id) {
      return;
    }
    const res = await DuplicatePost(id, session);
    if (res) {
      alert("Post duplicated successfully");
    } else {
      alert("Post duplication failed");
    }
  };

  return (
    <div className=" flex flex-row">
      <div className="flex flex-1 justify-end">
        <LeftSide session={session} />
      </div>
      <div className="flex justify-center w-full max-w-xl mx-auto">
        <div className="w-full h-screen flex flex-col border-x-[1px] border-neutral-700 dark:border-neutral-400 space-y-10">
          <div className="h-24 w-full border-b-[1px] border-neutral-700 dark:border-neutral-400">
            <div className="md:hidden flex justify-between items-center w-full p-2">
              {session?.user.name ? (
                <Link href={`/profile/${session.user.name}`}>
                  <img
                    src={session?.user.avatar}
                    alt="avatarFeed"
                    className="h-6 w-6 rounded-full cursor-pointer"
                  />
                </Link>
              ) : (
                <div></div>
              )}
              <img src="/coffee.png" alt="logoFeed" className="h-6 w-6" />
              <Cog6ToothIcon className="h-6 w-6" />
            </div>
            <div className="w-full h-full flex flex-row justify-between items-center px-2 pb-10 md:pb-0 ">
              <div className=" flex flex-row items-center gap-2">
                <PushBackButton />
                <p className="font-light text-lg md:text-xl">Details</p>
              </div>
              {isMine ? (
                <AdjustmentsHorizontalIcon
                  className="h-6 w-6 md:w-8 md:h-8 flex justify-end tcursor-pointer hover:scale-105 transition duration-150 active:scale-95 "
                  onClick={() => router.push(`/coffee-list/${id}/update`)}
                />
              ) : (
                <div></div>
              )}
            </div>
          </div>
          {/* card */}
          <div className="flex justify-center items-center">
            <div className="bg-gradient-to-br from-neutral-100 to-white dark:from-neutral-700 dark:to-black rounded-3xl p-[2px] cursor-pointer transition duration-150 w-full max-w-5xl mx-5 h-full">
              <div className="bg-white dark:bg-black rounded-[22px] w-full h-full p-4 lg:p-6 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl">
                  <div className="pr-5 h-full w-full pb-5 flex gap-2 flex-col">
                    <div className="flex items-center gap-2 pb-5">
                      <img
                        src={
                          post?.author?.avatar || "/images/default-profile.svg"
                        }
                        alt="avatar"
                        className="h-10 w-10 rounded-full"
                      />
                      {post?.author?.name}
                    </div>
                    <div className="flex flex-col pb-2">
                      <p className="text-2xl font-light">{post?.title}</p>
                      <p className="text-lg font-light">{post?.brand}</p>
                    </div>
                    <ExpandCardInput text={post?.country} />
                    <ExpandCardInput text={post?.tasting} />
                    <ExpandCardInput text={post?.note} title="Notes:" />
                    <ExpandCardInput text={post?.variety} title="Variety:" />
                    <ExpandCardInput text={post?.price} title="Price:" />
                    <ExpandCardInput text={post?.weight} title="Weight:" />
                    <ExpandCardInput text={post?.domain} title="Domain:" />
                    <ExpandCardInput text={post?.altitude} title="Altitude:" />
                    <ExpandCardInput text={post?.process} title="Process:" />
                    <ExpandCardInput
                      text={post?.type}
                      title="Type of extraction"
                    />
                  </div>
                  {post?.imageUrl && (
                    <div className="object-cover mb-5 flex justify-center md:justify-end items-center">
                      <img
                        src={post?.imageUrl}
                        alt="postImage"
                        className="h-fit max-h-[500px]  lg:max-h-[600px] w-fit rounded-2xl object-cover mb-5"
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-end">
                  <div className="">
                    <HearthRate rate={post?.rate} />
                  </div>
                  <p className="text-sm font-light">
                    {post?.createdAt
                      ?.toJSON()
                      .slice(0, 10)
                      .split("-")
                      .reverse()
                      .join("/")}
                  </p>
                </div>
                <div className="border-t-[1px] border-black dark:border-white mt-4 pt-4 absolutw w-12/12 flex justify-between">
                  <div className="">
                    {/* duplicate to post to account */}
                    {!isMine && session?.user.id && (
                      <button
                        onClick={() => {
                          handleDuplicate(id, session);
                        }}
                      >
                        <PlusCircleIcon className="h-6 w-6  dark:text-white hover:scale-105" />
                      </button>
                    )}
                  </div>

                  {/* copy link of post */}
                  <div className=" dark:text-white hover:scale-105 ">
                    <button
                      onClick={() => {
                        copyClipboard(id);
                        setClicked(true);
                        setTimeout(() => {
                          setClicked(false);
                        }, 1000);
                      }}
                      className="flex items-center justify-center"
                    >
                      {clicked ? (
                        <div className="dark:text-white flex flex-row items-center justify-center">
                          <p className="text-xs">link copied</p>
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      ) : (
                        <ArrowUpOnSquareIcon className="h-6 w-6" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 justify-start">
        <RightSide session={session} />
      </div>
    </div>
  );
};

export default ExpandedCard;
