import React from "react";
import { findSearchPost } from "../actions";
import DisplayCards from "@/components/renderCards";
import { getCurrentUser, getUserByName } from "@/lib/actions";
import { RightSide } from "@/components/rightSide";
import { LeftSide } from "@/components/leftSide";
import { DefaultHeader } from "@/components/defaultHeader";
import DisplayUsers from "@/components/displayUsers";

type PageProps = {
  params: {
    id: string;
  };
};

const SearchPage = async ({ params }: PageProps) => {
  const session = await getCurrentUser();

  const key = params.id.split("-")[0];
  const value = params.id.split("-")[1];
  const isPrivate = params.id.split("-")[2];

  const MyValue = key === "rate" ? Number.parseInt(value) : value;
  const posts = await findSearchPost(key, MyValue, isPrivate);
  const users = await getUserByName(value, false);

  return (
    <div className=" flex flex-row min-h-screen">
      <div className="flex flex-1 justify-end">
        <LeftSide session={session} />
      </div>
      <div className="flex justify-center w-full md:max-w-xl mx-auto">
        <div className="relative w-full h-full flex flex-row">
          <div className="w-full flex flex-col sm:border-0 md:border-x-[1px] border-neutral-700 dark:border-neutral-400">
            <DefaultHeader session={session} title="Results" />
            {(key === "user" || key === "all") && value && users.length > 0 ? (
              <DisplayUsers users={users} />
            ) : null}
            {key !== "user" && <DisplayCards post={posts} session={session} />}
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
