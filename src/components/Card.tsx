"use client";

import HearthRate from "./HearthRate";
import { useRouter } from "next/navigation";
import {
  ArrowUpOnSquareIcon,
  CheckIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { SessionInterface } from "@/lib/session";
import { DuplicatePost } from "@/lib/actions";
import { useState } from "react";

export type CardProps = {
  title: string;
  brand: string;
  tasting: string | null;
  createdAt: Date | null;
  rate: number;
  shadow?: string;
  color?: string | null;
  id: string;
  session?: any;
  clickable?: boolean;
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
    session: SessionInterface | null,
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
    navigator.clipboard.writeText(
      `${window.location.origin}` + `/coffee-list/${id}`,
    );
  };

  return (
    <div
      className="dark:bg-gradient-to-br border-black border-[1px]  dark:from-neutral-700 dark:to-black rounded-2xl p-[2px] w-56 h-64 md:w-72 md:h-80 cursor-pointer hover:scale-105 transition duration-150"
      key={id}
      onClick={() => redirectToCard()}
    >
      <div className="bg-white dark:bg-black rounded-[14px] w-full h-full p-4 md:p-6 relative">
        <p className="text-lg font-medium md:text-xl  text-clip truncate">
          {title}
        </p>
        <p className="font-light  text-lg  text-clip truncate">{brand}</p>
        <p className="font-light text-md  truncate pt-6 md:pt-10">{tasting}</p>
        <div className="absolute bottom-20 left-5">
          <HearthRate rate={rate} />
        </div>
        <p className="text-sm font-light absolute bottom-20 right-5">
          {createdAt?.toJSON().slice(0, 10).split("-").reverse().join("/")}
        </p>
        <div className="border-b-[1px] border-black dark:border-white my-4 absolutw w-12/12 px-10" />
        <div className="absolute bottom-5 left-5 z-40">
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
        <div className="absolute bottom-5 right-5 h-6 w-6 dark:text-white hover:scale-105 z-40">
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
            className="flex items-center justify-center "
          >
            {clicked ? (
              <CheckIcon className="h-6 w-6" />
            ) : (
              <ArrowUpOnSquareIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
