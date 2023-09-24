import React from "react";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import AuthProviders from "./AuthProviders";
import { getCurrentUser } from "@/lib/session";
import SignOutButton from "./SignOutButton";

const SideBar = async () => {
  const session = await getCurrentUser();
  return (
    <div className="">
      <Link href={"/"}>
        <ListBulletIcon className="flex mt-6 ml-3" width={40} height={32} />
      </Link>
      <p className="flex justify-center text-2xl font-light ">koffy</p>
      <div className="flex flex-col mt-10 gap-6 items-center ">
        <Link href="/coffee-list">
          <p>coffe Lists</p>
        </Link>
        <p>about</p>
        <Link href={"/"}>
          <p>Get Started</p>
        </Link>
        {!session?.user ? <AuthProviders /> : <SignOutButton />}
      </div>
    </div>
  );
};

export default SideBar;
