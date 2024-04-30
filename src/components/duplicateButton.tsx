"use client";

import type { SessionInterface } from "@/app/types/types";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import { DuplicatePost } from "@/lib/actions";

type Props = {
  session: SessionInterface | null;
  id: string;
};

const handleDuplicate = async (
  id: string,
  session: SessionInterface | null,
) => {
  if (!session?.user.id) {
    return;
  }
  const res = await DuplicatePost(id, session);
  if (res) {
    alert("Post duplicated successfully");
  } else {
    alert("Post duplication failed");
  }
};

const DuplicateButton = ({ session, id }: Props) => {
  return (
    <button
      onClick={() => {
        handleDuplicate(id, session);
      }}
      className="flex justify-center items-center"
    >
      {session?.user.id ? (
        <PlusCircleIcon className=" h-6 w-6 md:h-8 md:w-8 dark:text-white hover:scale-105" />
      ) : null}
    </button>
  );
};

export default DuplicateButton;
