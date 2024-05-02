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
    <div className=" w-full h-full items-center">
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
        <div className="bg-gradient-to-br from-neutral-100 to-white dark:from-neutral-700 dark:to-black rounded-3xl p-[2px] cursor-pointer transition duration-150 w-80 md:w-96 lg:w-[500px]">
          <div className="bg-white dark:bg-black rounded-[22px] w-full h-full p-4 lg:p-6 relative">
            <p className="text-lg font-medium lg:text-xl  text-clip truncate">
              {post?.title}
            </p>
            <p className="font-light text-lg text-clip truncate">
              {post?.brand}
            </p>
            <p className="font-light text-md  truncate flex justify-end ">
              {post?.country}
            </p>
            <p className="font-light text-md  truncate py-6 lg:py-10 ">
              {post?.tasting}
            </p>
            {post?.imageUrl && (
              <div className="h-64 xs:h-[400px] lg:h-[450px] w-full object-cover mb-5">
                <img
                  src={post?.imageUrl}
                  alt="postImage"
                  className="h-64 xs:h-[400px] lg:h-[450px] w-full rounded-2xl object-cover mb-5"
                />
              </div>
            )}
            <div className="flex justify-between">
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
                    <PlusCircleIcon className=" h-6 w-6  dark:text-white hover:scale-105" />
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
