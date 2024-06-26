"use client";

import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import AuthProviders from "./authProviders";
import SignOutButton from "./signOutButton";
import type { SessionInterface } from "@/app/types/types";
import HowItWorks from "./howItWorksButton";

type Props = {
  session: SessionInterface | null;
  isSideBarOpen: boolean;
  setIsSidebarOpen: (isSideBarOpen: boolean) => void;
  setSearchClicked: (searchClicked: boolean) => void;
};

const SideBar = ({
  session,
  isSideBarOpen,
  setIsSidebarOpen,
  setSearchClicked,
}: Props) => {
  return (
    <div className="flex w-full h-full z-50 ">
      <div className="w-3/4 md:w-1/3 lg:w-1/4 xl:w-1/5 h-full bg-white dark:bg-black rounded-[_0_3rem_0_0]">
        <div className="flex justify-start items-start"></div>
        <div className="flex justify-center items-center pt-10">
          <Link href={"/"} onClick={() => setIsSidebarOpen(!isSideBarOpen)}>
            <p className="flex justify-center text-2xl font-light ">koffy</p>
          </Link>
        </div>
        <div className="mt-5  flex justify-center items-center">
          <span className="w-1/5 border-b-[1px]" />
        </div>
        <div className="flex flex-col mt-10 gap-4 items-start justify-start pl-20 w-full ">
          <button
            className="px-4 py-2 hover:scale-105 active:scale-95 transition duration-150 flex items-center justify-center rounded-full border-black dark:border-white border-[1px] text-sm gap-2"
            onClick={() => {
              setSearchClicked(true);
              setIsSidebarOpen(!isSideBarOpen);
            }}
          >
            <p>search</p>
            <MagnifyingGlassIcon className="w-4 h-4" />
          </button>
          <Link
            href="/coffee-list"
            onClick={() => setIsSidebarOpen(!isSideBarOpen)}
          >
            <p className="rounded-full flex items-center tracking-wide px-3 py-2 border-black dark:border-white border-[1px] text-sm">
              my coffee list
            </p>
          </Link>
          <Link
            href="/search-page/brand--public"
            onClick={() => setIsSidebarOpen(!isSideBarOpen)}
            className="rounded-full flex items-center tracking-wide px-3 py-2 border-black dark:border-white border-[1px] text-sm"
          >
            all coffee
          </Link>
          <Link
            href="/create-card"
            onClick={
              !session?.user
                ? () => alert("Please sign in to create a card")
                : () => setIsSidebarOpen(!isSideBarOpen)
            }
            className="rounded-full flex items-center tracking-wide px-3 py-2 border-black dark:border-white border-[1px] text-sm"
          >
            create
          </Link>
          {/* <Link href={"/wishlist"} onClick={() => setIsSidebarOpen(!isSideBarOpen)}> 
		 			 <p>wishlist</p>
		  			</Link> */}
          <a
            href="https://www.juliencros.com"
            onClick={() => setIsSidebarOpen(!isSideBarOpen)}
            className="rounded-full flex items-center tracking-wide px-3 py-2 border-black dark:border-white border-[1px] text-sm"
          >
            about
          </a>
          <div
            onClick={() => setIsSidebarOpen(!isSideBarOpen)}
            className="space-y-6 flex flex-col items-start"
          >
            <HowItWorks />
            {!session?.user ? (
              <AuthProviders />
            ) : (
              <SignOutButton name={session.user.name} />
            )}
          </div>
        </div>
      </div>
      <div
        className="h-full w-1/4  md:w-2/3 lg:w-3/4 xl:w-4/5"
        onClick={() => setIsSidebarOpen(!isSideBarOpen)}
      ></div>
    </div>
  );
};

export default SideBar;
