"use client";

import { LeftSide } from "@/components/leftSide";
import { RightSide } from "@/components/rightSide";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { deleteUser, getCurrentUser } from "@/lib/actions";
import Loader from "@/components/loader";
import { DefaultHeader } from "@/components/defaultHeader";
import SwitchDarkLightMode from "@/components/switchDarkLightMode";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
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

  const handleDeleteAccount = async () => {
    if (!session?.user) return;

    if (confirm("Are you sure you want to delete your account?")) {
      await deleteUser(session);
      router.push("/");
    }
    return;
  };

  return (
    <div className="flex flex-row min-h-screen">
      <div className="flex flex-1 md:justify-end">
        <LeftSide session={session} />
      </div>
      <div className="flex justify-center w-full md:max-w-xl mx-auto">
        <div className="relative w-full h-full flex flex-row">
          <div className="w-full flex flex-col border-0 md:border-x-[1px] border-neutral-700 dark:border-neutral-400">
            <DefaultHeader title="Settings" />
            <div className="flex flex-col pl-10 gap-2 pt-10">
              <div className="">
                <p className="font-light">Theme:</p>
              </div>
              <div className="pl-5">
                <SwitchDarkLightMode />
              </div>
            </div>
            {session?.user && (
              <div className="flex flex-col pl-10 gap-2 pt-10">
                <p className="font-light">Account:</p>
                <div className="pl-5">
                  <h1 className="flex items-center gap-1">
                    <button
                      className="cursor-pointer border-[1px] py-2 px-3 border-neutral-700 dark:border-neutral-400 rounded-md"
                      onClick={handleDeleteAccount}
                    >
                      delete Account
                    </button>
                  </h1>
                </div>
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
