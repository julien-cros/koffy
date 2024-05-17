"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CategorySearchBar from "./categorySearchBar";
import { SessionInterface } from "@/app/types/types";
import ButtonPrivatePublic from "./buttonPrivatePublic";
import BaseSearchBar from "./baseSearchBar";

type Props = {
  session: SessionInterface | null;
};

export function RightSide({ session }: Props) {
  const router = useRouter();
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked) {
      router.push(
        `/search-page/${category}-${search}-${isPublic ? "public" : "private"}`
      );
      setClicked(false);
      setClicked(false);
    }
  }, [clicked]);

  return (
    <div className="fixed pt-24 hidden md:block md:pl-5 lg:pl-10">
      <div className="w-full max-w-3xl mx-auto flex justify-center items-center border-[1px] border-black dark:border-neutral-400 rounded-lg p-3">
        <div className="w-full max-w-3xl mx-auto">
          <BaseSearchBar
            session={session}
            setSearch={setSearch}
            setClicked={setClicked}
          />
          <div className="">
            <p className="font-light pt-2">filter:</p>
            <div className="flex flex-row gap-2">
              <CategorySearchBar setCategorySearch={setCategory} />
              <ButtonPrivatePublic status={isPublic} setStatus={setIsPublic} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
