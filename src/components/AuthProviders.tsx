"use client";

import { signIn } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";

const AuthProviders = () => {
  const Router = useRouter();
  return (
    <button
      onClick={() => {
        signIn("google");
        Router.push("/");
      }}
      className={`rounded-full tracking-wide px-4 py-2
			bg-orange-500 dark:text-black
			hover:scale-105 transition duration-105 ease-out active:scale-95 text-xs md:text-sm`}
			>
      sign in with google
    </button>
  );
};

export default AuthProviders;