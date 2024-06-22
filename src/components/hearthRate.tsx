import React from "react";
import { HeartIcon } from "@heroicons/react/24/solid";

type HearthRateProps = {
  rate: number | null | undefined;
};

const HearthRate = ({ rate }: HearthRateProps) => {
  if (!rate) rate = 0;
  return (
    <div className="flex flex-row min-w-full">
      <HeartIcon
        width={24}
        height={24}
        className={`${
          rate >= 1
            ? "text-orange-500"
            : "text-neutral-200 dark:text-neutral-600"
        }`}
      />
      <HeartIcon
        width={24}
        height={24}
        className={`${
          rate >= 2
            ? "text-orange-500"
            : "text-neutral-200 dark:text-neutral-600"
        }`}
      />
      <HeartIcon
        width={24}
        height={24}
        className={`${
          rate >= 2
            ? "text-orange-500"
            : "text-neutral-200 dark:text-neutral-600"
        }`}
      />
      <HeartIcon
        width={24}
        height={24}
        className={`${
          rate >= 4
            ? "text-orange-500"
            : "text-neutral-200 dark:text-neutral-600"
        }`}
      />
      <HeartIcon
        width={24}
        height={24}
        className={`${
          rate >= 5
            ? "text-orange-500"
            : "text-neutral-200 dark:text-neutral-600"
        }`}
      />
    </div>
  );
};

export default HearthRate;
