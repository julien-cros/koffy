import React from "react";
import HearthRate from "./HearthRate";

type CardProps = {
  title: string;
  brand: string;
  tasting: string | null;
  createdAt: Date | null;
  rate: number;
  shadow?: string;
  color?: string | null;
};

const Card = ({
  title,
  brand,
  tasting,
  createdAt,
  rate,
  shadow,
  color,
}: CardProps) => {
  return (
    <div
      className={`
		${shadow ? shadow : "shadow-xl"}
		${color ? color : "bg-pale-red"}
		 rounded-2xl px-6 py-4 h-48 w-64 md:h-52 md:w-96 cursor-pointer hover:scale-105 transition duration-150 active:scale-95`}
    >
      <p className="text-md md:text-xl font-semibold pl-4 pt-4 pr-6 text-clip truncate">
        {title}
      </p>
      <p className="text-sm pl-4 pt-1 pr-6 text-clip truncate">{brand}</p>
      <p className="text-sm pl-4 pr-6 pt-6 truncate">{tasting}</p>
      <div className="flex flex-row pt-10 justify-between">
        <HearthRate rate={rate} />
        <p className="text-sm pr-4">
          {createdAt?.toJSON().slice(0, 10).split("-").reverse().join("/")}
        </p>
      </div>
    </div>
  );
};

export default Card;
