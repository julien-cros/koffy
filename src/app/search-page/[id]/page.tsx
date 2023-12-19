import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import React from "react";
import Link from "next/link";
import { findSearchPost } from "../actions";
import Card from "@/components/Card";

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
      <div className="flex flex-row justify-between items-center p-10">
        <div className="flex flex-row items-center gap-2">
          <Link href={"/coffee-list"}>
            <ArrowLeftIcon className="w-5 h-5 md:w-7 md:h-7 lg:w-10 lg:h-10 cursor-pointer hover:scale-105 transition duration-150 active:scale-95" />
          </Link>
          <p className="text-2xl md:text-3xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tl from-yellow-900 from-50% to-rose-300">
            Results
          </p>
        </div>
      </div>
      <div className="mt-20 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-items-center gap-10 pb-10">
        {posts?.map((post) => (
          <Link href={`/coffee-list/${post.id}`} key={post.id}>
            <Card
              key={post.id}
              title={post?.title}
              brand={post?.brand}
              tasting={post?.tasting}
              createdAt={post?.createdAt}
              rate={post?.rate}
            />
          </Link>
        ))}
        {!posts && (
          <p className="flex justify-center items-center text-lg md:text-xl lg:text-2xl">
            Nothing Found
          </p>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default SearchPage;
