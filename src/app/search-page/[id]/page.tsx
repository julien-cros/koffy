import React from "react";
import { findSearchPost } from "../actions";
import PushBackButton from "@/components/PushBackButton";
import DisplayCards from "@/components/RenderCards";

type PageProps = {
  params: {
    id: string;
  };
};

const SearchPage = async ({ params }: PageProps) => {
  const key = params.id.split("-")[0];
  const value = params.id.split("-")[1];
  const isPrivate = params.id.split("-")[2];

  const MyValue = key === "rate" ? parseInt(value) : value;
  const posts = await findSearchPost(key, MyValue, isPrivate);

  return (
    <div className="w-full h-full items-cneter">
      <div className="flex flex-row justify-between items-center m-10">
        <div className="flex flex-row items-center gap-2">
         	<PushBackButton />
          <p className="text-2xl md:text-3xl lg:text-5xl font-light">
            results
          </p>
        </div>
      </div>
				<DisplayCards	post={posts} />
    </div>
  );
};

export default SearchPage;
