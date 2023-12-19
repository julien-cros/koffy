"use client";

import React from "react";
import { ListBulletIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import AuthProviders from "./AuthProviders";
import SignOutButton from "./SignOutButton";
import { SessionInterface } from "@/lib/session";
import HowItWorks from "./HowItWorksButton";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";

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
  const AlertBox = () => {
    Swal.fire({
      icon: "warning",
      title: "You need to be logged in to create a card",
      showCloseButton: true,
      timer: 10000,
      timerProgressBar: true,
      showConfirmButton: true,
      confirmButtonColor: "#c2410c",
      confirmButtonText: "Sign in",
    }).then((result) => {
      if (result.isConfirmed) {
        signIn("google");
      }
    });
  };

  return (
    <div className="flex w-full h-full z-50 ">
      <div className="w-3/4 md:w-1/3 lg:w-1/4 xl:w-1/5 h-full background-color rounded-[_0_3rem_0_0]">
        <div className="flex justify-start items-start">
          <ListBulletIcon
            className="flex mt-6 ml-3"
            width={40}
            height={32}
            onClick={() => setIsSidebarOpen(!isSideBarOpen)}
          />
        </div>
        <div className="flex justify-center items-center pt-10]">
          <Link href={"/"} onClick={() => setIsSidebarOpen(!isSideBarOpen)}>
            <p className="flex justify-center text-2xl font-light ">koffy</p>
          </Link>
        </div>
        <div className="mt-5  flex justify-center items-center">
          <span className="w-1/5 border-b-[1px]" />
        </div>
        <div className=" h-1/2 flex flex-col mt-5 gap-6 items-center justify-center">
          <button
            className=" px-4 py-2 hover:scale-105 active:scale-95 transition duration-150"
            onClick={() => {
              setSearchClicked(true);
              setIsSidebarOpen(!isSideBarOpen);
            }}
          >
            <MagnifyingGlassIcon className="w-6 h-6" />
          </button>
          <Link
            href="/coffee-list"
            onClick={() => setIsSidebarOpen(!isSideBarOpen)}
          >
            <p>coffe Lists</p>
          </Link>
          <Link
            href="/create-card"
            onClick={
              !session?.user
                ? () => AlertBox()
                : () => setIsSidebarOpen(!isSideBarOpen)
            }
          >
            create
          </Link>
          {/* <Link href={"/wishlist"} onClick={() => setIsSidebarOpen(!isSideBarOpen)}> 
		 	 <p>wishlist</p>
		  </Link> */}
          <a
            href="https://www.juliencros.com"
            onClick={() => setIsSidebarOpen(!isSideBarOpen)}
          >
            About
          </a>
          <div
            onClick={() => setIsSidebarOpen(!isSideBarOpen)}
            className="space-y-6 flex flex-col items-center"
          >
            <HowItWorks />
            {!session?.user ? <AuthProviders /> : <SignOutButton />}
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
