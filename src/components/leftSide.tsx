"use client";

import {
  BookmarkIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  ExclamationCircleIcon,
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
    <div className="hidden md:block h-screen fixed border-r-[1px] lg:pr-10 w-64">
      <div className="flex flex-col justify-start">
        <Link
          href="/"
          className="px-3 py-3 cursor-pointer transition duration-100 hover:bg-neutral-800 w-fit rounded-full"
        >
          <img
            src="/coffee.png"
            alt="logo"
            width={24}
            height={24}
            className="dark:invert"
          />
        </Link>
        <div className="w-full flex flex-col space-y-1">
          <button
            className="w-full cursor-pointer transition duration-100 hover:bg-opacity-80 hover:bg-neutral-800 rounded-lg py-2 px-3 flex flex-row items-center gap-2"
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
            className="w-full cursor-pointertransition duration-100 hover:bg-opacity-80 hover:bg-neutral-800 rounded-lg py-2 px-3 flex flex-row items-center gap-2"
          >
            <ClipboardDocumentListIcon className="w-6 h-6" />
            <p className="hidden lg:block">My Coffee</p>
          </Link>
          <Link
            href="/about"
            className="w-full cursor-pointertransition duration-100 hover:bg-opacity-80 hover:bg-neutral-800 rounded-lg py-2 px-3 flex flex-row items-center gap-2"
          >
            <ExclamationCircleIcon className="w-6 h-6 rotate-180" />
            <p className="hidden lg:block">About</p>
          </Link>
          <Link
            href="/saves"
            className="w-full cursor-pointertransition duration-100 hover:bg-opacity-80 hover:bg-neutral-800 rounded-lg py-2 px-3 flex flex-row items-center gap-2"
          >
            <BookmarkIcon className="w-6 h-6" />
            <p className="hidden lg:block">Saves</p>
          </Link>
          {session?.user && (
            <Link
              href={`/profile/${session?.user?.userId}`}
              className="w-full cursor-pointertransition duration-100 hover:bg-opacity-80 hover:bg-neutral-800 rounded-lg py-2 px-3 flex flex-row items-center gap-2"
            >
              <UserIcon className="w-6 h-6" />
              <p className="hidden lg:block">Profile</p>
            </Link>
          )}
        </div>
      </div>
      {session?.user ? (
        <SignOutButton
          name={session?.user?.name}
          style={
            "w-full cursor-pointertransition duration-100 hover:bg-opacity-80 hover:bg-neutral-800 rounded-lg py-2 px-3 flex flex-row items-center gap-2 "
          }
        />
      ) : (
        <AuthProviders
          style={
            "w-full cursor-pointertransition duration-100 hover:bg-opacity-80 hover:bg-neutral-800 rounded-lg py-2 px-3 flex flex-row items-center gap-2"
          }
        />
      )}
      <Link
        href="/settings"
        className="w-full cursor-pointertransition duration-100 hover:bg-opacity-80 hover:bg-neutral-800 rounded-lg py-2 px-3 flex flex-row items-center gap-2"
      >
        <Cog6ToothIcon className="w-6 h-6" />
        <p className="hidden lg:block">settings</p>
      </Link>
      <div className="">
        {session?.user && (
          <div>
            <Link
              href={`/profile/${session?.user?.userId}`}
              className="w-full cursor-pointertransition duration-100 hover:bg-opacity-80 hover:bg-neutral-800 rounded-lg py-2 px-3 flex flex-row items-center gap-2"
            >
              <img
                src={session?.user.avatar || "/images/default-profile.svg"}
                alt="avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
              {session?.user.name}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

//TODO: put this in bottom of the left side
