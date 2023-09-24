"use client";

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import React from "react";

const SignOutButton = () => {
  return (
    <div
      className="cursor-pointer hover:scale-105 transition duration-150  active:scale-95"
      onClick={() => signOut()}
    >
      <ArrowRightOnRectangleIcon className="w-5 h-5" />
    </div>
  );
};

export default SignOutButton;
