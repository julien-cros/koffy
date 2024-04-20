"use client";

import { signIn } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";

type SignInButtonProps = {
  bgColor?: string;
  textColor?: string;
  hoverBgColor?: string;
  hoverTextColor?: string;
  borderColor?: string;
  border?: string;
};

const AuthProviders = ({
  bgColor,
  textColor,
  hoverBgColor,
  hoverTextColor,
  borderColor,
  border,
}: SignInButtonProps) => {
  const Router = useRouter();
  return (
    <button
      onClick={() => {
        signIn("google");
        Router.push("/");
      }}
      className={`rounded-full tracking-wide px-4 py-2
			bg-orange-500 text-white dark:text-black
			hover:scale-105 transition duration-105 ease-out active:scale-95 shadow-lg active:shadow-xl text-xs md:text-sm`}
			>
      sign in with oogle
    </button>
  );
};

export default AuthProviders;

// ${bgColor ? bgColor : "bg-amber-800"}
// ${textColor ? textColor : "text-white"}
// ${hoverBgColor ? hoverBgColor : "hover:bg-amber-800"}
// ${hoverTextColor ? hoverTextColor : "hover:text-white"}
// ${borderColor ? borderColor : "border-none"}
// ${border ? border : "border-none"}