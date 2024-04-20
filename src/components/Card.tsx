"use client";

import HearthRate from "./HearthRate";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import CopyBlipboardButton from "./CopyBlipboardButton";

type CardProps = {
  title: string;
  brand: string;
  tasting: string | null;
  createdAt: Date | null;
  rate: number;
  shadow?: string;
  color?: string | null;
  id: string;
  setState: (value: boolean) => void;
};

const Card = ({
  title,
  brand,
  tasting,
  createdAt,
  rate,
  id,
  setState,
}: CardProps) => {

  return (
    // <div className="bg-gradient-to-bl from-neutral-300 dark:from-neutral-600 dark:to-neutral-700 rounded-2xl p-[2px] w-56 h-64 md:w-80 md:h-96 cursor-pointer hover:scale-105 transition duration-150 active:scale-95">
    <div className="dark:bg-gradient-to-br border-black border-[1px]  dark:from-neutral-700 dark:to-black rounded-2xl p-[2px] w-56 h-64 md:w-72 md:h-80 cursor-pointer hover:scale-105 transition duration-150">
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
        <div
          onClick={() => setState(true)}
          className="absolute bottom-5 left-5"
        >
          <PlusCircleIcon className=" h-6 w-6  dark:text-white hover:scale-105" />
        </div>
        <div
          className="absolute bottom-5 right-5 h-6 w-6 z-10 dark:text-white hover:scale-105"
          onClick={() => setState(true)}
        >
          <CopyBlipboardButton cardId={id} />
        </div>
      </div>
    </div>
  );
};

export default Card;
