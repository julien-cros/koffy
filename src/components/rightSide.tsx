"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CategorySearchBar from "./categorySearchBar";
import { SessionInterface } from "@/app/types/types";
import ButtonPrivatePublic from "./buttonPrivatePublic";
import BaseSearchBar from "./baseSearchBar";

type Props = {
  session: SessionInterface | undefined | null;
};

export function RightSide({ session }: Props) {
  const router = useRouter();
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked) {
      if (category === "user") {
        router.push(`/search-page/${category}-${search}`);
      } else {
        router.push(
          `/search-page/${category}-${search}-${
            isPublic ? "public" : "private"
          }`
        );
      }
      setClicked(false);
    }
  }, [clicked]);

  return (
    <div className=" fixed h-screen pt-14 hidden lg:block px-5">
      <div className="w-full max-w-3xl mx-auto flex justify-center items-center border-[1px] border-black dark:border-neutral-400 rounded-lg p-3">
        <div className="w-full max-w-3xl mx-auto">
          <BaseSearchBar
            session={session}
            setSearch={setSearch}
            setClicked={setClicked}
          />
          <div>
            <p className="font-light pt-2">filter:</p>
            <div className="flex flex-wrap  gap-2">
              <CategorySearchBar setCategorySearch={setCategory} />
              <ButtonPrivatePublic status={isPublic} setStatus={setIsPublic} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
