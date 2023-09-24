"use client";

import React from "react";
import { HeartIcon } from "@heroicons/react/24/solid";

type Props = {
  setState: (value: number) => void;
};

const HearthInput = async ({ setState }: Props) => {
  const [rate, setRate] = React.useState<number>(0);

	return (
    <div className="flex p-2 justify-start">
      <HeartIcon
        width={30}
        height={30}
        onClick={() => {
          setState(1);
        }}
        className="text-red-500"
      />
      <HeartIcon
        width={30}
        height={30}
        onClick={() => {
          setState(2);
        }}
        className={`${rate >= 2 ? "text-red-500" : "text-gray-400"}`}
      />
      <HeartIcon
        width={30}
        height={30}
        onClick={() => {
          setState(3);
        }}
        className={`${rate >= 3 ? "text-red-500" : "text-gray-400"}`}
      />
      <HeartIcon
        width={30}
        height={30}
        onClick={() => {
          setState(4);
        }}
        className={`${rate >= 4 ? "text-red-500" : "text-gray-400"}`}
      />
      <HeartIcon
        width={30}
        height={30}
        onClick={() => {
          setState(5);
        }}
        className={`${rate >= 5 ? "text-red-500" : "text-gray-400"}`}
      />
    </div>
  );
};

export default HearthInput;
