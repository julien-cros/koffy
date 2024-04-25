"use client";

import React from "react";
import { HeartIcon } from "@heroicons/react/24/solid";

type Props = {
  rate: number;
  setRate: (rate: number) => void;
};

const HearthInput = ({ rate, setRate }: Props) => (
  <div className="flex p-2 justify-start">
    <HeartIcon
      width={20}
      height={20}
      onClick={() => {
        setRate(1);
      }}
      className="text-orange-500"
    />
    <HeartIcon
      width={20}
      height={20}
      onClick={() => {
        setRate(2);
      }}
      className={`${rate >= 2 ? "text-orange-500" : "text-gray-400"}`}
    />
    <HeartIcon
      width={20}
      height={20}
      onClick={() => {
        setRate(3);
      }}
      className={`${rate >= 3 ? "text-orange-500" : "text-gray-400"}`}
    />
    <HeartIcon
      width={20}
      height={20}
      onClick={() => {
        setRate(4);
      }}
      className={`${rate >= 4 ? "text-orange-500" : "text-gray-400"}`}
    />
    <HeartIcon
      width={20}
      height={20}
      onClick={() => {
        setRate(5);
      }}
      className={`${rate >= 5 ? "text-orange-500" : "text-gray-400"}`}
    />
  </div>
);

export default HearthInput;
