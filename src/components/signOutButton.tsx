"use client";

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import React from "react";

type Props = {
  name: string | null;
  style?: string | null;
};

const SignOutButton = ({ name, style }: Props) => {
  return (
    <div
      className={`${
        style
          ? style
          : "cursor-pointer flex gap-1 hover:scale-105 transition duration-150 active:scale-95 bg-orange-500 dark:text-black px-3 py-2 rounded-full"
      }`}
      onClick={() => signOut()}
    >
      <ArrowRightOnRectangleIcon className="w-8 h-8 min-w-fit" />
      <p
        className={`${style ? "hidden lg:block text-lg truncate" : "truncate"}`}
      >
        {name ? `${name}` : "Sign Out"}
      </p>
    </div>
  );
};

export default SignOutButton;
