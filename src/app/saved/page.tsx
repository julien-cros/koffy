"use client";

import { LeftSide } from "@/components/leftSide";
import { RightSide } from "@/components/rightSide";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/actions";
import Loader from "@/components/loader";
import { DefaultHeader } from "@/components/defaultHeader";
import { getSavedPostPacked } from "./savedAction";
import Card from "@/components/card";
import LoadMoreSaved from "@/components/loadMoreSaved";

export default function page() {
  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const res = await getCurrentUser();
      return res;
    },
  });

  const { data: saved, isLoading: isLoadingSaved } = useQuery({
    queryKey: ["saved", session?.user?.id],
    enabled: !!session?.user,
    queryFn: async () => {
      const res = await getSavedPostPacked(session?.user?.id, 8, 0);
      return res;
    },
  });

  if (isLoadingSaved) {
    return (
      <div className="h-screen w-full justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-row min-h-screen">
      <div className="flex flex-1 md:justify-end">
        <LeftSide session={session} />
      </div>
      <div className="flex justify-center w-full md:max-w-xl mx-auto">
        <div className="relative w-full h-full flex flex-row">
          <div className="w-full flex flex-col border-0 md:border-x-[1px] border-neutral-700 dark:border-neutral-400">
            <DefaultHeader title="Saved" />
            {saved?.length === 0 || !saved ? (
              <div className="flex justify-center items-center pt-10">
                {session?.user ? (
                  <p className="text-lg dark:text-neutral-300 text-neutral-700">
                    No saved posts yet
                  </p>
                ) : (
                  <p className="text-lg dark:text-neutral-300 text-neutral-700">
                    Log In to to access your saved posts
                  </p>
                )}
              </div>
            ) : (
              <div className="flex flex-col p-4 md:p-2 space-y-4 md:space-y-2">
                {saved?.map((mapped) => (
                  <Card
                    key={mapped.id}
                    session={session}
                    title={mapped.post.title}
                    brand={mapped.post.brand}
                    tasting={mapped.post.tasting}
                    createdAt={mapped.post.createdAt}
                    rate={mapped.post.rate}
                    id={mapped.post.id}
                    imageUrl={mapped.post.imageUrl}
                    country={mapped.post.country}
                    author={mapped.post.author?.name}
                    avatar={mapped.post.author?.avatar}
                  />
                ))}
                {session?.user.id && <LoadMoreSaved session={session} />}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-1 justify-start">
        <RightSide session={session} />
      </div>
    </div>
  );
}
