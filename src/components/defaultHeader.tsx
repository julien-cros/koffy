"use client";

import React from "react";
import PushBackButton from "./pushBackButton";
import Link from "next/link";
import Image from "next/image";

type DefaultHeaderProps = {
  title: string;
};

export function DefaultHeader({ title }: DefaultHeaderProps) {
  return (
    <div className="w-full h-24 md:h-16 border-b-[1px] border-y-black dark:border-neutral-400">
      <Link
        href={"/"}
        className="w-full h-fit flex justify-center pt-2 md:hidden"
      >
        <Image src={"/coffee.png"} alt={"logo"} width={24} height={24} />
      </Link>
      <div className="h-full w-fit flex flex-row justify-center pl-2 items-center gap-2 md:pb-0">
        <PushBackButton />
        <p className="font-light text-lg md:text-xl">{title}</p>
      </div>
    </div>
  );
}
