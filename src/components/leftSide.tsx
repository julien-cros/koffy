"use client";

import {
  BookmarkIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  ExclamationCircleIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { SquaresPlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SignOutButton from "./signOutButton";
import AuthProviders from "./authProviders";

export default function LeftSide({ session }: { session: any }) {
  const router = useRouter();
  return (
    <div className="hidden md:block h-screen fixed lg:pr-10 w-60 pt-10 md:pt-24">
      {/* TODO: test some border to get greates style*/}
      <div className="flex flex-col justify-start lg:items-start items-end border-r-[1px]">
        <Link
          href="/"
          className="px-3 py-3 cursor-pointer transition duration-100 dark:hover:bg-neutral-800 hover:bg-neutral-200 w-14 rounded-lg mr-5 flex justify-center"
        >
          <img
            src="/coffee.png"
            alt="logo"
            width={24}
            height={24}
            className="dark:invert"
          />
        </Link>
        <div className="w-full flex flex-col items-end space-y-1 md:pr-5">
          <Link
            href="/"
            className="lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
          >
            <HomeIcon className="w-6 h-6" />
            <p className="hidden lg:block">Home</p>
          </Link>
          <button
            className="lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
            onClick={
              session?.user
                ? () => router.push("/create-card")
                : () => alert("Please sign in to create a card")
            }
          >
            <SquaresPlusIcon className="w-6 h-6" />
            <p className="hidden lg:block">Create</p>
          </button>
          <Link
            href="/coffee-list"
            className="lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
          >
            <ClipboardDocumentListIcon className="w-6 h-6" />
            <p className="hidden lg:block">Coffee List</p>
          </Link>
          <Link
            href="/about"
            className="lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
          >
            <ExclamationCircleIcon className="w-6 h-6 rotate-180" />
            <p className="hidden lg:block">About</p>
          </Link>
          <Link
            href="/saves"
            className="lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
          >
            <BookmarkIcon className="w-6 h-6" />
            <p className="hidden lg:block">Saves</p>
          </Link>
          {session?.user && (
            <Link
              href={`/profile/${session?.user?.name}`}
              className="lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
            >
              <UserIcon className="w-6 h-6" />
              <p className="hidden lg:block">Profile</p>
            </Link>
          )}
          {session?.user ? (
            <SignOutButton
              name={session?.user?.name}
              style={
                "lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
              }
            />
          ) : (
            <AuthProviders
              style={
                "lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
              }
            />
          )}
          <Link
            href="/settings"
            className="lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
          >
            <Cog6ToothIcon className="w-6 h-6" />
            <p className="hidden lg:block">settings</p>
          </Link>
        </div>
      </div>
      {session?.user && (
        <div className="absolute left-16 lg:left-0 bottom-5">
          <Link
            href={`/profile/${session?.user?.userId}`}
            className="flex flex-row items-center cursor-pointer gap-2 transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3"
          >
            <img
              src={session?.user.avatar || "/images/default-profile.svg"}
              alt="avatar"
              width={32}
              height={32}
              className="rounded-full flex justify-end items-end"
            />
            {session?.user.name}
          </Link>
        </div>
      )}
    </div>
  );
}

//TODO: put this in bottom of the left side
