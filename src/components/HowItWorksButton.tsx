"use client";

import Link from "next/link";
import React from "react";

const HowItWorks = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, "");
    const elem = document.getElementById(targetId);
    window.scrollTo({
      top: elem?.getBoundingClientRect().top,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex justify-center">
      <Link
        href="#section-1"
        className="bg-amber-800 text-pale-red px-4 py-2 rounded-full hover:bg-pale-red hover:text-amber-800 transition duration-105 ease-out active:scale-95 shadow-lg active:shadow-xl text-xs md:text-sm"
        onClick={handleScroll}
      >
        How it works?
      </Link>
    </div>
  );
};

export default HowItWorks;
