"use client";

import React, { useState } from "react";
import HearthRate from "./hearthRate";
import {
  AdjustmentsHorizontalIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import {
  ArrowUpOnSquareIcon,
  CheckIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import type { SessionInterface } from "@/app/types/types";
import type { PostInterface } from "@/app/types/types";
import copy from "clipboard-copy";
import { DuplicatePost } from "@/lib/actions";
import ExpandCardInput from "./expandCardInput";

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
        `${window.location.origin}` + `/coffee-list/${id}`
      );
    }
    () => copyClipboard(id);
    setTimeout(() => {}, 1000);
  };

  const handleDuplicate = async (
    id: string,
    session?: SessionInterface | null
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
    <div className=" w-full h-full items-center pb-10">
      <div className="flex flex-row justify-between items-center p-10">
        <div onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeftIcon className="w-5 h-5 md:w-7 md:h-7 lg:w-10 lg:h-10 cursor-pointer hover:scale-105 transition duration-150 active:scale-95" />
          <p className="text-2xl md:text-3xl lg:text-5xl font-light">details</p>
        </div>
        <div className={`${isMine ? "block" : "hidden"}`}>
          <div className='flex justify-end mr-0 md:mr-5 lg:mr-10 xl:mr-10"'>
            <AdjustmentsHorizontalIcon
              className="w-10 h-10 flex justify-end tcursor-pointer hover:scale-105 transition duration-150 active:scale-95 "
              onClick={() => router.push(`/coffee-list/${id}/update`)}
            />
          </div>
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
                    src={post?.author?.avatar || "/images/default-profile.svg"}
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
                <ExpandCardInput text={post?.type} title="Type of extraction" />
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
  );
};

export default ExpandedCard;
