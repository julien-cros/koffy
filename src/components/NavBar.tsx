import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import AuthProviders from "./AuthProviders";
import { getCurrentUser } from "@/lib/session";
import SignOutButton from "./SignOutButton";

export default async function Nav() {
  const session = await getCurrentUser();

  return (
    <nav className="sticky top-0 flex justify-between items-center py-5 px-3 sm:px-3 md:px-4 lg:px-2 xl:px-6 backdrop-blur-sm ">
      <div className="flex items-center space-x-4">
        <Link href={"/little-navbar"}>
          <ListBulletIcon className="w-8 h-8 hidden max-lg:block" />
        </Link>
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
        <input
          type="text"
          placeholder="Search..."
          className="w-1/2 hidden sm:hidden md:block placeholder-gray-400 text-sm rounded-lg px-5 py-2 ring-1 outline-none ring-gray-200 hover:ring-gray-300 focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <div className="flex items-center space-x-8">
        <Link
          href="/coffee-list"
          className="hidden lg:block text-sm"
        >
          Coffee List
        </Link>
        <Link
          href="/about"
          className="hidden lg:block text-sm"
        >
          About
        </Link>
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
    </nav>
  );
}
