"use client";

import { UserInterface } from "@/app/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// TODO: button to see more users if there are more than 6. display only 6 users
export default function DisplayUsers({ users }: { users: UserInterface[] }) {
  return (
    <div className="border-b-[1px] w-full border-neutral-700 dark:border-neutral-400">
      <p className="p-2 text-lg font-light">Users:</p>
      <div className="grid grid-cols-2 pb-5 w-full px-5 gap-5">
        {users.map((user, index) => (
          <Link
            href={`/profile/${user.name}`}
            key={index}
            className="flex w-full items-center space-x-2 border-[1px] px-3 py-2 border-neutral-700 dark:border-neutral-400 rounded-lg"
          >
            <Image
              src={user.avatar || "/images/default-profile.svg"}
              alt="avatar"
              className="w-10 h-10 rounded-full"
              width={40}
              height={40}
            />
            <p className="w-full truncate">{user.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
