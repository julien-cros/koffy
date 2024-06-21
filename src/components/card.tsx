"use client";

import HearthRate from "./hearthRate";
import { useRouter } from "next/navigation";
import {
  ArrowUpOnSquareIcon,
  BookmarkIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import type { SessionInterface } from "@/app/types/types";
import { useState } from "react";
import copy from "clipboard-copy";
import { savePost } from "@/app/saved/savedAction";
import Image from "next/image";
import Link from "next/link";

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
  author?: string | null;
  avatar?: string | null;
  isSaved?: boolean;
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
  author,
  avatar,
  isSaved,
}: CardProps) {
  const router = useRouter();

  const [clicked, setClicked] = useState(false);
  const [saved, setSaved] = useState(isSaved);

  // const { data: dataSaved, isLoading: isLoadingSaved } = useQuery({
  //   queryKey: ["saved", id],
  //   queryFn: async () => {
  //     const res = await getSavedPost(id, session?.user.id);
  //     return res;
  //   },
  // });

  // useEffect(() => {
  //   if (dataSaved) {
  //     setSaved(true);
  //   } else {
  //     setSaved(false);
  //   }
  // }, [dataSaved]);

  const redirectToCard = () => {
    if (clickable) {
      router.push(`/coffee-list/${id}`);
    }
  };

  const handleSavePost = async () => {
    if (session) {
      const res = await savePost(id, session.user.id);
      setSaved(res);
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
      className="w-full min-w-fit border-b-[1px] border-neutral-600 dark:border-neutral-800"
      key={id}
      onClick={redirectToCard}
    >
      <div className="w-full h-full p-4 relative">
        <Link
          className="flex items-center gap-2 pb-5 w-fit"
          href={`profile/${author}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Image
            src={avatar || "images/default-profile.svg"}
            alt="avatar"
            className="h-10 w-10 rounded-full"
            width={40}
            height={40}
          />
          {author}
        </Link>
        <p className="text-lg font-medium lg:text-xl  text-clip truncate">
          {title}
        </p>
        <p className="font-light text-lg text-clip truncate">{brand}</p>
        <p className="font-light text-md  truncate flex justify-end pr-4">
          {country}
        </p>
        <p className="font-light text-md  truncate py-4 ">{tasting}</p>
        {imageUrl && (
          <div className="w-full h-52 relative">
            <img
              src={imageUrl}
              alt="postImage"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}

        <div className="border-t-[1px] grid grid-cols-4 border-neutral-300 dark:border-neutral-700 mt-4 pt-4 absolutw w-full items-center">
          <div className="">
            <HearthRate rate={rate} />
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSavePost();
            }}
          >
            <BookmarkIcon
              className={`h-6 w-6 ${
                saved ? "text-orange-500 fill-orange-500" : ""
              }`}
            />
          </button>

          {/* copy link of post */}
          <div className=" dark:text-white">
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
          <p className="text-sm font-light flex text-center">
            {createdAt?.toJSON().slice(0, 10).split("-").reverse().join("/")}
          </p>
        </div>
      </div>
    </div>
  );
}
