"use client";

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import React from "react";

type Props = {
  name: string | null;
};

const SignOutButton = ({ name }: Props) => {
  return (
    <div
      className="cursor-pointer flex gap-1 hover:scale-105 transition duration-150 active:scale-95 bg-orange-500 dark:text-black px-3 py-2 rounded-full"
      onClick={() => signOut()}
    >
      <p className="text-sm">{name ? `${name}` : "Sign out"}</p>
      <ArrowRightOnRectangleIcon className="w-5 h-5" />
    </div>
  );
};

export default SignOutButton;
