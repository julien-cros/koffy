import {
  AdjustmentsHorizontalIcon,
  ArrowRightIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import Card from "./Card";
import Link from "next/link";

const GetStarted = () => {
  return (
    <div className="w-full  items-center gap-6">
			<div className=" border-black border-t-[1px] m-10 mx-6 md:mx-8 lg:mx-10"/>
      <h1 className="flex justify-center text-3xl md:text-4xl lg:text-5xl ">
        How does this work
      </h1>
      <h2 className="flex justify-center text-center text-md md:text-xl mt-10">
        Go to Coffee Lists and create a new <br className="block lg:hidden" />
        coffee Card, then you can rate it.
      </h2>
      <div className="flex space-x-10 pt-10 justify-center items-center ">
        <p className="flex items-center text-md md:text-xl">
          click here to create
          <ArrowRightIcon className="h-34 w-4" />
        </p>
        <Link href="/create-card">
          <PlusIcon className="h-10 w-10 hover:scale-105 transition duration-150 flex justify-end active:scale-95 ease-out" />
        </Link>
      </div>
      <div className="flex flex-row justify-center items-center space-x-10">
        <p className="flex text-md md:text-xl items-center">
          you can modify your Cards here
          <ArrowRightIcon className="h-34 w-4" />
        </p>
        <AdjustmentsHorizontalIcon className="h-10 w-10 hover:scale-105 transition duration-150 flex justify-end active:scale-95 ease-out" />
      </div>
      <div className="mt-20 px-10 gap-10 flex justify-center">
        <Card
          title="Coffe Name"
          brand="Coffe Brand"
          tasting="what does the coffee taste like"
          rate={4}
          createdAt={new Date()}
					id=""
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-8 text-center py-20">
        <div className="">
          <p className="text-md md:text-xl">New thoughts?</p>
          <p className="pb-4 text-md md:text-xl"> update it with this button</p>
          <button className="text-xs md:text-sm  py-2 px-4 border-[1px] border-black dark:border-white rounded-full shadow-md hover:scale-105 active:scale-95 active:shadow-lg transition duration-150">
            Update
          </button>
        </div>
        <div className="space-y-4">
          <p className="text-md md:text-xl">You can also delete a Card here</p>
          <button className="text-xs md:text-sm py-2 px-4 border-[1px] border-black dark:border-white rounded-full shadow-md hover:scale-105 active:scale-95 active:shadow-lg transition duration-150">
            Delete
          </button>
        </div>
        <div>
          <p className="flex justify-center text-center text-md md:text-xl py-10">
            You just need to taste and rate it in our site. <br />
            One day we will be able to find <br className="block lg:hidden" />
            what is the best coffee for you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
