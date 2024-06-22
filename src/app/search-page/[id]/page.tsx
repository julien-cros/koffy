"use client";

import React from "react";
import { findSearchPostPacked } from "../actions";
import DisplayCards from "@/components/renderCards";
import { getCurrentUser, getUserByName } from "@/lib/actions";
import { RightSide } from "@/components/rightSide";
import { LeftSide } from "@/components/leftSide";
import { DefaultHeader } from "@/components/defaultHeader";
import DisplayUsers from "@/components/displayUsers";
import { useQuery } from "@tanstack/react-query";

type PageProps = {
  params: {
    id: string;
  };
};

const SearchPage = ({ params }: PageProps) => {
  const { data: session } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const res = await getCurrentUser();
      return res;
    },
  });

  const category = params.id.split("-")[0];
  const value = params.id.split("-")[1];
  const isPrivate = params.id.split("-")[2];

  const MyValue = category === "rate" ? Number.parseInt(value) : value;

  const { data: posts } = useQuery({
    queryKey: ["quryPosts", category, MyValue, isPrivate],
    queryFn: async () => {
      const res = await findSearchPostPacked(
        category,
        MyValue,
        isPrivate,
        8,
        0
      );
      return res;
    },
  });

  const { data: users } = useQuery({
    queryKey: ["followers", value],
    queryFn: async () => {
      const res = await getUserByName(value, false);
      return res;
    },
  });

  //TODO: add button to search more users

  return (
    <div className=" flex flex-row min-h-screen">
      <div className="flex flex-1 justify-end">
        <LeftSide session={session} />
      </div>
      <div className="flex justify-center w-full md:max-w-xl mx-auto">
        <div className="relative w-full h-full flex flex-row">
          <div className="w-full flex flex-col sm:border-0 md:border-x-[1px] border-neutral-700 dark:border-neutral-400">
            <DefaultHeader title="Results" />
            {(category === "user" || category === "all") && value && users ? (
              <DisplayUsers users={users} />
            ) : null}
            {category !== "user" && (
              <DisplayCards
                post={posts}
                session={session}
                category={category}
                MyValue={MyValue}
                isPrivate={isPrivate}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-1 justify-start">
        <RightSide session={session} />
      </div>
    </div>
  );
};

export default SearchPage;
