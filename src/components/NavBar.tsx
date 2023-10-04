"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import AuthProviders from "./AuthProviders";
import SignOutButton from "./SignOutButton";
import SideBar from "./SideBar";
import { SessionInterface } from "@/lib/session";
import { useState } from "react";
import BaseSearchBar from "./BaseSearchBar";
// import ResultSearchBar from "./ResultSearchBar";

type Props = {
  session: SessionInterface | null;
};

export default function Nav({ session }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [categorySearch, setCategorySearch] = useState("brand");
//   const handleSearch =  async () => {
	
//   }

  return (
    <nav className="sticky top-0">
      {isSidebarOpen && (
        <div className="w-screen h-screen absolute flex justify-center items-center bg-opacity-50">
          <SideBar
            session={session}
            isSideBarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>
      )}
      <div
        className={`${
          isSidebarOpen ? "relative" : ""
        } flex justify-between items-center py-5 px-3 md:px-4 lg:px-2 xl:px-6 backdrop-blur-sm `}
      >
        <div className="flex items-center space-x-4">
          <ListBulletIcon
            className="w-8 h-8 hidden max-lg:block active:scale-90 transition duration-150 ease-in-out cursor-pointer"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
          <div className="items-center flex flex-row gap-1">
            <Link href="/">
              <Image
                src="/coffee.png"
                alt="coffe logo"
                width={40}
                height={40}
                className="rounded-full"
              />
            </Link>
            <p className="text-3xl font-light">koffy</p>
          </div>
        </div>
        <div className="flex-grow flex justify-center">
          <BaseSearchBar session={session} />
		  	
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
