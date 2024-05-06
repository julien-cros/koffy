"use client";

import { signIn } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";

type props = {
  style?: string;
};

const AuthProviders = ({ style }: props) => {
  const Router = useRouter();
  return (
    <button
      onClick={() => {
        signIn("google");
        Router.push("/");
      }}
      className={`${
        style
          ? style
          : "rounded-full tracking-wide px-4 py-2 bg-orange-500 dark:text-black hover:scale-105 transition duration-105 ease-out active:scale-95 text-sm"
      }`}
    >
      <ArrowLeftOnRectangleIcon className="w-6 h-6" />
      <p className={`${style ? "hidden lg:block" : ""}`}>sign in with google</p>
    </button>
  );
};

export default AuthProviders;
