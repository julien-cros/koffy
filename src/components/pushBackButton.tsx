"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

const PushBackButton = () => {
  const router = useRouter();

  return (
    <button onClick={() => router.back()}>
      <ArrowLeftIcon className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:scale-105 transition duration-150 active:scale-95" />
    </button>
  );
};

export default PushBackButton;
