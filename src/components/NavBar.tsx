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
  };

  const atoi = (type: string, str: string) => {
    if (type === "rate") {
      return parseInt(str);
    } else {
      return str;
    }
  };

  const handleSearchSubmit = async () => {
    if (session) {
      handleSearch(categorySearch, search);
      const res = await findPosts(
        categorySearch,
        atoi(categorySearch, search),
        session?.user?.id,
      );
      if (res) {
        setSearchClicked(false);
        setPosts(res);
        setIsSearchOpen(true);
        return;
      } else {
        alert("No results found");
      }
    } else {
      alert("You must be logged in to serach");
    }
  };

  return (
    <nav className={`${isSearchOpen ? "sticky top-0" : "sticky top-0"}`}>
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
        <div className="flex flex-col justify-center items-center gap-4 z-10">
          <div className="flex flex-row items-center justify-center gap-2">
            <BaseSearchBar session={session} setSearch={setSearch} />
            <button className=" w-8 h-8 bg-white border-[1px] rounded-md">
              <ChevronRightIcon
                className="w-6 h-6 pl-1 "
                onClick={handleSearchSubmit}
              />
            </button>
          </div>
          <CategorySearchBar setCategorySearch={setCategorySearch} />
        </div>
      </div>
      <div
        className={`${
          isSearchOpen ? "block" : "hidden"
        } w-screen h-screen absolute bg-black bg-opacity-50 overflow-scroll z-10`}
      >
        <ResultSearchBar setIsSearchOpen={setIsSearchOpen} posts={posts} />
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
            <CategorySearchBar setCategorySearch={setCategorySearch} />
            <BaseSearchBar session={session} setSearch={setSearch} />
            <MagnifyingGlassIcon
              className="w-5 h-5 mt-2"
              onClick={handleSearchSubmit}
            />
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
