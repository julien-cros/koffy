import React from "react";
import HearthRate from "./HearthRate";

type CardProps = {
  title: string | null;
  brand: string | null;
  tasting: string | null;
  createdAt: Date | null;
  rate: number | null;
  shadow?: string;
};

const Card = ({ title, brand, tasting, createdAt, rate, shadow }: CardProps) => {
  return (
    <div className={`
		${shadow ? shadow : "shadow-xl"}
	bg-pale-red rounded-2xl px-6 py-4 h-48 w-64 md:h-52 md:w-96 cursor-pointer hover:scale-105 transition duration-150 active:scale-95`}>
      <p className="text-lg md:text-xl font-semibold pl-4 pt-4 pr-6 text-clip overflow-hidden">{title}</p>
      <p className="text-sm pl-4 pt-1 pr-6 text-clip overflow-hidden">{brand}</p>
      <p className="text-md pl-4 pr-6 pt-6 truncate">{tasting}</p>
      <div className="flex flex-row  items-center gap-5 justify-between pt-5 text-clip overflow-hidden">
        <HearthRate rate={rate} />
        <p className="text-sm pr-6">
          {createdAt?.toJSON().slice(0, 10).split("-").reverse().join("/")}
        </p>
      </div>
    </div>
  );
};

export default Card;
