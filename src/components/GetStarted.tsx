import { ArrowRightIcon, SquaresPlusIcon } from "@heroicons/react/24/solid";
import React from "react";
import Card from "./Card";
import Link from "next/link";

const GetStarted = () => {
  return (
    <div className="h-screen w-full pt-32  items-center gap-6">
      <h1 className="flex justify-center text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-900">
        How does this work
      </h1>
      <h2 className="flex justify-center text-center text-xl md:text-2xl text-yellow-900 font-semibold mt-10">
        Go to Coffee Lists and create a new <br className="block lg:hidden" />
        coffee Card, then you can rate it.
      </h2>
      <div className="flex space-x-10 pt-10 justify-center items-center ">
        <p className="flex items-center">
          click here to create
          <ArrowRightIcon className="h-34 w-4" />
        </p>
        <Link href="/create-card">
          <SquaresPlusIcon className="h-10 w-10 text-amber-800 hover:scale-105 transition duration-150 flex justify-end active:scale-95 ease-out" />
        </Link>
      </div>
      <div className="mt-20 px-10  gap-10 flex justify-center">
        <Card
          title="Coffe Name"
          brand="Coffe Brand"
          tasting="what does the coffee taste like"
          rate={4}
          updatedAt={new Date()}
        />
      </div>
      <p className="flex justify-center text-center text-xl md:text-2xl text-yellow-900 font-semibold py-20">
        You just need to taste a rate it in our site. <br />
        One day we will be able to find <br className="block lg:hidden" /> you
        what is the best coffee for you.
      </p>
    </div>
  );
};

export default GetStarted;
