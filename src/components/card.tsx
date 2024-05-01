"use client";

import HearthRate from "./hearthRate";
import { useRouter } from "next/navigation";
import {
  ArrowUpOnSquareIcon,
  CheckIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import type { SessionInterface } from "@/app/types/types";
import { DuplicatePost } from "@/lib/actions";
import { useState } from "react";
import copy from "clipboard-copy";

export type CardProps = {
  title: string;
  brand: string;
  tasting: string | null;
  createdAt: Date | null;
  rate: number;
  id: string;
  session?: SessionInterface | null;
  clickable?: boolean;
  imageUrl: string | null;
  country: string | null;
};

export default function Card({
  title,
  brand,
  tasting,
  createdAt,
  rate,
  id,
  session,
  clickable,
  imageUrl,
  country,
}: CardProps) {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);

  const redirectToCard = () => {
    if (clickable) {
      router.push(`/coffee-list/${id}`);
    }
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

  const handleCopyClipboard = () => {
    if (!navigator.clipboard) {
      copy(`${window.location.origin}` + `/coffee-list/${id}`);
    } else {
      navigator.clipboard.writeText(
        `${window.location.origin}` + `/coffee-list/${id}`,
      );
    }
  };

  return (
    <div
      className="dark:bg-gradient-to-br dark:from-neutral-700 dark:to-black rounded-3xl p-[2px] cursor-pointer transition duration-150 w-80 md:w-96 lg:w-[500px]"
      key={id}
      onClick={() => redirectToCard()}
    >
      <div className="bg-white dark:bg-black rounded-[22px] w-full h-full p-4 lg:p-6 relative">
        <p className="text-lg font-medium lg:text-xl  text-clip truncate">
          {title}
        </p>
        <p className="font-light text-lg text-clip truncate">{brand}</p>
        <p className="font-light text-md  truncate flex justify-end ">
          {country}
        </p>
        <p className="font-light text-md  truncate py-6 lg:py-10 ">{tasting}</p>
        {imageUrl && (
          <div className="h-64 xs:h-[400px] lg:h-[450px] w-full object-cover mb-5">
            <img
              src={imageUrl}
              alt="postImage"
              className="h-64 xs:h-[400px] lg:h-[450px] w-full rounded-2xl object-cover mb-5"
            />
          </div>
        )}
        <div className="flex justify-between">
          <div className="">
            <HearthRate rate={rate} />
          </div>
          <p className="text-sm font-light">
            {createdAt?.toJSON().slice(0, 10).split("-").reverse().join("/")}
          </p>
        </div>
        <div className="border-t-[1px] border-black dark:border-white mt-4 pt-4 absolutw w-12/12 flex justify-between">
          <div className="">
            {/* duplicate to post to account */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDuplicate(id, session);
              }}
            >
              {session?.user.id ? (
                <PlusCircleIcon className=" h-6 w-6  dark:text-white hover:scale-105" />
              ) : null}
            </button>
          </div>

          {/* copy link of post */}
          <div className=" dark:text-white hover:scale-105 ">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleCopyClipboard();
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
  );
}
