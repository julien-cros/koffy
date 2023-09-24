import React from "react";
import HearthRate from "./HearthRate";

type CardProps = {
  title: string;
  brand: string | null;
  tasting: string | null;
  updatedAt: Date | null;
  rate: number | null;
}


const Card = ({ title, brand, tasting, updatedAt, rate }: CardProps) => {

  return (
    <div className="bg-slate-100 rounded-2xl shadow-xl px-6 py-4 h-fit w-fit ">
      <p className="text-xl font-semibold pl-4 pt-4 pr-6">{title}</p>
      <p className="text-sm pl-4 pt-1 pr-6">{brand}</p>
      <p className="text-lg pl-4 pr-6 pt-6">
        {tasting}
      </p>
	  <div className="flex flex-row  items-center gap-5 justify-between pt-5">
	  	<HearthRate rate={rate}/>
	  	<p className="text-sm pr-6">{updatedAt?.toJSON().slice(0,10).split('-').reverse().join('/')}</p>
	  </div>
    </div>
  );
};

export default Card;
