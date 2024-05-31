"use client";

import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import PushBackButton from "./pushBackButton";
import type { SessionInterface } from "@/app/types/types";

type DefaultHeaderProps = {
  session: SessionInterface | null | undefined;
  title: string;
};

export function DefaultHeader({ session, title }: DefaultHeaderProps) {
  return (
    <div className="w-full h-24 border-b-[1px] border-y-black dark:border-neutral-400">
      <div className="md:hidden flex justify-between items-center w-full p-2">
        {session?.user ? (
          <Link href={`/profile/${session.user.name}`}>
            <img
              src={session?.user.avatar}
              alt="avatarFeed"
              className="h-6 w-6 rounded-full cursor-pointer"
            />
          </Link>
        ) : (
          <div className="h-6 w-6"></div>
        )}
        <Link href={"/"}>
          <img src="/coffee.png" alt="logoFeed" className="h-6 w-6" />
        </Link>
        <Link href={"/settings"}>
          <Cog6ToothIcon className="h-6 w-6" />
        </Link>
      </div>
      <div className="h-full w-fit flex flex-row justify-start pl-2 items-center gap-2 pb-10 md:pb-0">
        <PushBackButton />
        <p className="font-light text-lg md:text-xl">{title}</p>
      </div>
    </div>
  );
}
