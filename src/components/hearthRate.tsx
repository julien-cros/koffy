import React from "react";
import { HeartIcon } from "@heroicons/react/24/solid";

type HearthRateProps = {
  rate: number | null | undefined;
};

const HearthRate = ({ rate }: HearthRateProps) => {
  if (!rate) rate = 0;
  return (
    <div className="flex flex-row">
      <HeartIcon
        width={20}
        height={20}
        className={`${rate >= 1 ? "text-orange-500" : "hidden"}`}
      />
      <HeartIcon
        width={20}
        height={20}
        className={`${rate >= 2 ? "text-orange-500" : "hidden"}`}
      />
      <HeartIcon
        width={20}
        height={20}
        className={`${rate >= 2 ? "text-orange-500" : "hidden"}`}
      />
      <HeartIcon
        width={20}
        height={20}
        className={`${rate >= 4 ? "text-orange-500" : "hidden"}`}
      />
      <HeartIcon
        width={20}
        height={20}
        className={`${rate >= 5 ? "text-orange-500" : "hidden"}`}
      />
    </div>
  );
};

export default HearthRate;
