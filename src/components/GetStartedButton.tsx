"use client";

import { signIn } from "next-auth/react";

const GetStartedButton = () => {
  return (
    <div>
      <button
        className="bg-amber-800 text-pale-red px-4 py-2 rounded-full hover:bg-pale-red hover:text-amber-800 hover:scale-105 transition duration-105 ease-out active:scale-95 shadow-lg active:shadow-xl"
        onClick={() => signIn()}
      >
        Get Started
      </button>
    </div>
  );
};

export default GetStartedButton;
