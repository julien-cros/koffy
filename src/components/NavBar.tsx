"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRightIcon, ListBulletIcon, XMarkIcon } from "@heroicons/react/24/solid";
import AuthProviders from "./AuthProviders";
import SignOutButton from "./SignOutButton";
import SideBar from "./SideBar";
import { SessionInterface } from "@/lib/session";
import { useState } from "react";
import BaseSearchBar from "./BaseSearchBar";
import findPosts from "@/lib/actions";
import { PostInterface } from "./ExpandedCard";
import ResultSearchBar from "./ResultSearchBar";
import CategorySearchBar from "./CategorySearchBar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type Props = {
  session: SessionInterface | null;
};

export default function Nav({ session }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState("brand");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState<PostInterface[] | null>(null);
  const [searchClicked, setSearchClicked] = useState(false);

  const handleSearch = (fieldName: string, value: string) => {
    setCategorySearch(fieldName);
    setSearch(value);
    console.log(search);
  };

  const atoi = (type : string, str: string) => {
	if (type === "rate") {
	  return parseInt(str);
	} else {
	  return str;
	}
  }

  const handleSearchSubmit = async () => {
	setSearchClicked(false);
    if (session) {
		handleSearch(categorySearch, search);
      const res = await findPosts(categorySearch, atoi(categorySearch, search), session?.user?.id);
      if (res) {
		setPosts(res);
		setIsSearchOpen(true);
	} 
    } else {
      alert("You must be logged in to serach");
    }
  };

  return (
      <nav className={`${isSearchOpen ? "sticky top-0" : "sticky top-0"}`}>
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
				className={`${searchClicked ? "block" : "hidden" } w-screen h-screen flex justify-center items-center absolute bg-black bg-opacity-50`}
				>
				<XMarkIcon className="w-8 h-8 absolute top-5 right-5 text-white cursor-pointer" onClick={() => setSearchClicked(false)}/>
				<div className="flex flex-col justify-center items-center gap-4 z-10">
					<div className="flex flex-row items-center justify-center gap-2">
						<BaseSearchBar session={session} setSearch={setSearch}/>
						<button className=" w-8 h-8 bg-white border-[1px] rounded-md">
						<ChevronRightIcon className="w-6 h-6 pl-1 " onClick={handleSearchSubmit} />
						</button>
					</div>
            			<CategorySearchBar setCategorySearch={setCategorySearch}/>
			</div>
			</div>
		<div className={`${isSearchOpen ? 'block' : 'hidden'} w-screen h-screen absolute bg-black bg-opacity-50 overflow-scroll z-10`}>
			<ResultSearchBar setIsSearchOpen={setIsSearchOpen} posts={posts}/>
		</div>
        <div
          className={`
		  ${ isSidebarOpen ? "relative" : "" } 
		  flex justify-between items-center py-5 px-3 md:px-4 lg:px-2 xl:px-6  `}
        >
          <div className="flex items-center space-x-4">
            <ListBulletIcon
              className="w-8 h-8 hidden max-lg:block active:scale-90 transition duration-150 ease-in-out cursor-pointer"
              onClick={() => setIsSidebarOpen(true)}
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
		  <div className="lg:hidden flex flex-grow justify-end">
			<button
				className="lg:hidden px-4 py-2 hover:scale-105 active:scale-95 transition duration-150"
				onClick={() => setSearchClicked(true)}
			>
				<MagnifyingGlassIcon className="w-6 h-6" />
			</button>

		  </div>
          <div className='hidden lg:block'>
			<div className="flex justify-center items-center gap-2">
            	<CategorySearchBar setCategorySearch={setCategorySearch}/>
            	<BaseSearchBar session={session} setSearch={setSearch}/>
				<MagnifyingGlassIcon className="w-10 h-10" onClick={handleSearchSubmit}/>
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
