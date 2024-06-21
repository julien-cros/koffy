"use client";

import React from "react";
import { HeartIcon } from "@heroicons/react/24/solid";

type Props = {
  rate: number;
  setState: (value: number) => void;
};

const HearthInput = ({ rate, setState }: Props) => (
  <div className="flex p-2 justify-start">
    <HeartIcon
      onClick={() => {
        setState(1);
      }}
      className="text-orange-500 w-5 lg:w-6"
    />
    <HeartIcon
      onClick={() => {
        setState(2);
      }}
      className={`${
        rate >= 2 ? "text-orange-500" : "text-gray-400"
      } w-5 lg:w-6`}
    />
    <HeartIcon
      onClick={() => {
        setState(3);
      }}
      className={`${
        rate >= 3 ? "text-orange-500" : "text-gray-400"
      } w-5 lg:w-6`}
    />
    <HeartIcon
      onClick={() => {
        setState(4);
      }}
      className={`${
        rate >= 4 ? "text-orange-500" : "text-gray-400"
      } w-5 lg:w-6`}
    />
    <HeartIcon
      onClick={() => {
        setState(5);
      }}
      className={`${
        rate >= 5 ? "text-orange-500" : "text-gray-400"
      } w-5 lg:w-6`}
    />
  </div>
);

export default HearthInput;
