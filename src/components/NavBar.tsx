"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRightIcon,
  ListBulletIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import AuthProviders from "./AuthProviders";
import SignOutButton from "./SignOutButton";
import SideBar from "./SideBar";
import { SessionInterface } from "@/lib/session";
import { useState } from "react";
import BaseSearchBar from "./BaseSearchBar";
import CategorySearchBar from "./CategorySearchBar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ButtonPrivatePublic from "./ButtonPrivatePublic";

type Props = {
  session: SessionInterface | null;
};

export default function Nav({ session }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState("brand");
  const [status, setStatus] = useState(false);
  const [search, setSearch] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);

  return (
    <nav className="sticky top-0 z-40">
      <div
        className={`${
          isSidebarOpen
            ? "opacity-50 z-10 absolute w-screen h-screen"
            : "opacity-0 w-0 h-0"
        }   bg-opacity-50 transition-opacity  bg-black`}
      />
      <div
        className={`w-screen h-screen top-0 left-0 fixed flex justify-center items-center ease-in-out z-40 duration-300 ${
          isSidebarOpen ? "translate-x-0 " : "-translate-x-full"
        } overflow-hidden`}
      >
        <SideBar
          session={session}
          isSideBarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          setSearchClicked={setSearchClicked}
        />
      </div>

      <div
        className={`${
          searchClicked ? "block" : "hidden"
        } w-screen h-screen flex justify-center items-center absolute bg-black bg-opacity-50 z-10`}
      >
        <XMarkIcon
          className="w-8 h-8 absolute top-5 right-5 text-white cursor-pointer"
          onClick={() => setSearchClicked(false)}
        />
        <div className="flex flex-col justify-center items-center gap-4 z-40">
          <div className="flex flex-row items-center justify-center gap-2">
            <BaseSearchBar session={session} setSearch={setSearch} />
            <Link href={`/search-page/${categorySearch}-${search}-${status ? "public" : "private"}`}>
              <ChevronRightIcon
                className="w-6 h-6 pl-1 "
				onClick={() => setSearchClicked(false)}
              />
            </Link>
          </div>
		  <div className=" flex gap-[26px]  justify-center pr-[32px] "> 
		  <ButtonPrivatePublic  status={status}
			setStatus={setStatus}/>
          <CategorySearchBar setCategorySearch={setCategorySearch} />
		  </div>
        </div>
      </div>
      <div
        className={`
		  ${isSidebarOpen ? "relative" : ""} 
		  flex justify-between items-center py-5 px-3 md:px-4 lg:px-2 xl:px-6  backdrop-blur-sm `}
      >
        <div className="flex items-center space-x-4">
          <ListBulletIcon
            className="w-8 h-8 hidden max-lg:block active:scale-90 transition duration-150 ease-in-out cursor-pointer"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
          <Link href="/" className="flex flex-row items-center gap-1">
            <Image
              src="/coffee.png"
              alt="coffe logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <p className="text-3xl font-light">koffy</p>
          </Link>
        </div>
        <div className="hidden lg:block">
          <div className="flex gap-2">
			<ButtonPrivatePublic
			status={status}
			setStatus={setStatus}/>
            <CategorySearchBar setCategorySearch={setCategorySearch} />
            <BaseSearchBar session={session} setSearch={setSearch} />
            <Link href={`/search-page/${categorySearch}-${search}-${status ? "public" : "private"}`}>
              <MagnifyingGlassIcon
                className="w-5 h-5 mt-2"
              />
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-8">
          <Link href="/coffee-list" className="hidden lg:block text-sm">
            Coffee List
          </Link>
          <a
            href="https://www.juliencros.com/"
            className="hidden lg:block text-sm"
          >
            About
          </a>
          <div className="flex items-center">
            {session?.user ? (
              <div className="flex items-center space-x-2">
                <p className="text-sm">{session?.user?.name}</p>
                <SignOutButton />
              </div>
            ) : (
              <AuthProviders />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
