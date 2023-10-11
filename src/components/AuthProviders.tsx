"use client";

import { signIn } from "next-auth/react";
import React from "react";

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
  return (
    <button
      onClick={() => signIn("google")}
      className={`rounded-full tracking-wide px-4 py-2
 						${bgColor ? bgColor : "bg-amber-800"}
 						${textColor ? textColor : "text-white"}
 						${hoverBgColor ? hoverBgColor : "hover:bg-amber-800"}
 						${hoverTextColor ? hoverTextColor : "hover:text-white"}
 						${borderColor ? borderColor : "border-none"}
 						${border ? border : "border-none"}
						hover:scale-105 transition duration-105 ease-out active:scale-95 shadow-lg active:shadow-xl text-xs md:text-sm`}
    >
      Sign in with Google
    </button>
  );
};

export default AuthProviders;
