"use client";

import { LeftSide } from "@/components/leftSide";
import { RightSide } from "@/components/rightSide";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/actions";
import Loader from "@/components/loader";
import Link from "next/link";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import PushBackButton from "@/components/pushBackButton";
import { DefaultHeader } from "@/components/defaultHeader";

export default function page() {
  // use query/session

  const { data: session, isLoading: isLoadingSession } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const res = await getCurrentUser();
      return res;
    },
  });

  if (isLoadingSession) {
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
            <DefaultHeader session={session} title="Settings" />
            <div className="w-full h-full flex justify-center items-center">
              <p>Comming soon</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 justify-start">
        <RightSide session={session} />
      </div>
    </div>
  );
}
