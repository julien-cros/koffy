"use client";

import { SessionInterface } from "@/lib/session";
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
    >
      {session?.user.id ? (
        <PlusCircleIcon className=" h-6 w-6  dark:text-white hover:scale-105" />
      ) : null}
    </button>
  );
};

export default DuplicateButton;
