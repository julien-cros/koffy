"use client";

import React from "react";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import AuthProviders from "./AuthProviders";
import SignOutButton from "./SignOutButton";
import { SessionInterface } from "@/lib/session";
import { signIn } from "next-auth/react";
import HowItWorks from "./HowItWorksButton";

type Props = {
  session: SessionInterface | null;
  isSideBarOpen: boolean;
  setIsSidebarOpen: (isSideBarOpen: boolean) => void;
};

const SideBar = ({ session, isSideBarOpen, setIsSidebarOpen }: Props) => {
  return (
    <div className="flex w-full h-full bg-black bg-opacity-50 z-50">
      <div className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 h-full bg-white rounded-[_0_3rem_0_0]">
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
          <Link
            href="/coffee-list"
            onClick={() => setIsSidebarOpen(!isSideBarOpen)}
          >
            <p>coffe Lists</p>
          </Link>
          <a
            href="https://www.juliencros.com"
            onClick={() => setIsSidebarOpen(!isSideBarOpen)}
          >
            About
          </a>
          <h1 className="flex flex-col justify-center items-center space-y-6">
            {!session ? (
              <button onClick={() => signIn()}>Get Started</button>
            ) : (
              <HowItWorks />
            )}
            {!session?.user ? <AuthProviders /> : <SignOutButton />}
          </h1>
        </div>
      </div>
      <div
        className="h-full md:w-2/3 lg:w-3/4 xl:w-4/5"
        onClick={() => setIsSidebarOpen(!isSideBarOpen)}
      ></div>
    </div>
  );
};

export default SideBar;