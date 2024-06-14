"use client";

import React from "react";
import PushBackButton from "./pushBackButton";

type DefaultHeaderProps = {
  title: string;
};

export function DefaultHeader({ title }: DefaultHeaderProps) {
  return (
    <div className="w-full h-14 border-b-[1px] border-y-black dark:border-neutral-400">
      <div className="h-full w-fit flex flex-row justify-start pl-2 items-center gap-2 md:pb-0">
        <PushBackButton />
        <p className="font-light text-lg md:text-xl">{title}</p>
      </div>
    </div>
  );
}
