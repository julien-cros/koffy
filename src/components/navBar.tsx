"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRightIcon,
  ListBulletIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import AuthProviders from "./authProviders";
import SignOutButton from "./signOutButton";
import SideBar from "./sideBar";
import type { SessionInterface } from "@/app/types/types";
import { useState } from "react";
import BaseSearchBar from "./baseSearchBar";
import CategorySearchBar from "./categorySearchBar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ButtonPrivatePublic from "./buttonPrivatePublic";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";
import { usePathname } from "next/navigation";

type Props = {
  session: SessionInterface | null;
};

export const NavBar: React.FC<Props> = ({ session }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState("all");
  const [status, setStatus] = useState(true);
  const [search, setSearch] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [showNavBar, setShowNavBar] = useState(true);

  const AlertBox = () => {
    Swal.fire({
      icon: "warning",
      title: "You need to be logged in to create a card",
      showCloseButton: true,
      timer: 10000,
      timerProgressBar: true,
      showConfirmButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Sign in",
    }).then((result) => {
      if (result.isConfirmed) {
        signIn("google");
      } else {
        <Link href="/" />;
      }
    });
  };

  useEffect(() => {
    console.log(pathname);
    if (pathname === "/create-card" || pathname.includes("update")) {
      setShowNavBar(false);
    } else {
      setShowNavBar(true);
    }
  }, [pathname]);

  useEffect(() => {
    if (clicked) {
      router.push(
        `/search-page/${categorySearch}-${search}-${
          status ? "public" : "private"
        }`,
      );
      setClicked(false);
      setSearchClicked(false);
    }
  }, [clicked]);

  return (
    <>
      {showNavBar ? (
        <nav className="fixed w-full top-0 z-40">
          <div
            className={`${
              isSidebarOpen
                ? "opacity-50 z-10 absolute w-screen h-screen bg-black dark:bg-neutral-700 bg-opacity-50 transition-opacity"
                : "opacity-0 w-0 h-0"
            }   `}
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
            } w-screen h-screen flex flex-col items-center justify-center gap-10 absolute bg-white dark:bg-black z-10`}
          >
            <h1 className="text-5xl font-light">koffy</h1>
            <XMarkIcon
              className="w-8 h-8 absolute top-5 right-5 cursor-pointer"
              onClick={() => setSearchClicked(false)}
            />
            <div className="flex flex-col justify-center gap-4 z-40 px-20">
              <div className="flex flex-row items-center justify-center gap-2">
                <BaseSearchBar
                  session={session}
                  setSearch={setSearch}
                  setClicked={setClicked}
                />
                <Link
                  href={`/search-page/${categorySearch}-${search}-${
                    status ? "public" : "private"
                  }`}
                >
                  <ChevronRightIcon
                    className="w-6 h-6 pl-1 "
                    onClick={() => setSearchClicked(false)}
                  />
                </Link>
              </div>
              <h2 className="text-xs tracking-wide pl-2">filter</h2>
              <div className="flex flex-row items-start gap-2 ">
                <ButtonPrivatePublic status={status} setStatus={setStatus} />
                <CategorySearchBar setCategorySearch={setCategorySearch} />
              </div>
            </div>
          </div>
          <div
            className={`
		  ${isSidebarOpen ? "relative" : ""} 
		    backdrop-blur-sm  px-5 md:px-10`}
          >
            <div className="border-b-[1px] border-black dark:border-white py-5 px-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ListBulletIcon
                  className="w-6 h-6 hidden max-lg:block active:scale-90 transition duration-150 ease-in-out cursor-pointer"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                />
                <Link href="/" className="flex flex-row items-center gap-1">
                  <Image
                    src="/coffee.png"
                    alt="coffe logo"
                    width={25}
                    height={25}
                    className="rounded-full dark:filter dark:invert"
                  />
                  <p className="text-xl lg:text-2xl font-light">koffy</p>
                </Link>
              </div>
              <div className="hidden lg:block">
                <div className="flex gap-2">
                  <ButtonPrivatePublic status={status} setStatus={setStatus} />
                  <CategorySearchBar setCategorySearch={setCategorySearch} />
                  <BaseSearchBar
                    session={session}
                    setSearch={setSearch}
                    setClicked={setClicked}
                  />
                  <Link
                    href={`/search-page/${categorySearch}-${search}-${
                      status ? "public" : "private"
                    }`}
                  >
                    <MagnifyingGlassIcon className="w-5 h-5 mt-2" />
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/coffee-list"
                  className="hidden lg:block text-sm border-[1px] border-black dark:border-white rounded-full px-3 py-2"
                >
                  my coffee list
                </Link>
                <button
                  className="hidden lg:block text-sm border-[1px] border-black dark:border-white rounded-full px-3 py-2"
                  onClick={
                    session?.user
                      ? () => router.push("/create-card")
                      : () => AlertBox()
                  }
                >
                  create
                </button>
                <div className="flex items-center">
                  {session?.user ? (
                    <div className="flex items-center space-x-2 ">
                      <SignOutButton name={session?.user?.name} />
                    </div>
                  ) : (
                    <AuthProviders />
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      ) : null}
    </>
  );
};
