import {
  AdjustmentsHorizontalIcon,
  ArrowRightIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import Card from "./card";

const GetStarted = () => {
  return (
    <div className="w-full items-center gap-6">
      <div className=" border-black dark:border-white lg:border-t-[1px] m-10 mx-6 md:mx-8 lg:mx-10" />
      <h1 className="flex justify-center text-3xl md:text-4xl lg:text-5xl pt-4 lg:pt-14">
        how does this work
      </h1>
      <h2 className="flex justify-center text-center text-md md:text-xl mt-10">
        go to your coffee list and create a new{" "}
        <br className="block lg:hidden" />
        coffee card, then you can rate it.
      </h2>
      <div className="flex space-x-10 pt-10 justify-center items-center ">
        <p className="flex items-center text-md md:text-xl gap-2">
          click here to create
          <ArrowRightIcon className="h-34 w-4" />
        </p>
        <PlusIcon className="h-10 w-10 hover:scale-105 transition duration-150 flex justify-end active:scale-95 ease-out" />
      </div>
      <div className="flex flex-row justify-center items-center space-x-10">
        <p className="flex text-md md:text-xl items-center gap-2">
          you can modify your card here
          <ArrowRightIcon className="h-34 w-4" />
        </p>
        <AdjustmentsHorizontalIcon className="h-10 w-10 hover:scale-105 transition duration-150 flex justify-end active:scale-95 ease-out" />
      </div>
      <div className="mt-20 px-10 gap-10 flex justify-center w-full max-w-lg mx-auto">
        <Card
          title="Coffe Name"
          brand="Coffe Brand"
          tasting="what does the coffee taste like"
          rate={4}
          createdAt={new Date()}
          id=""
          session={null}
          clickable={false}
          imageUrl={""}
          country="Country"
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-8 text-center py-20">
        <div className="">
          <p className="text-md md:text-xl">new thoughts?</p>
          <p className="pb-4 text-md md:text-xl"> update it with this button</p>
          <button className="text-xs md:text-sm  py-2 px-4 border-[1px] border-black dark:border-white rounded-full hover:scale-105 active:scale-95 transition duration-150">
            update
          </button>
        </div>
        <div className="space-y-4">
          <p className="text-md md:text-xl">you can also delete a card here</p>
          <button className="text-xs md:text-sm py-2 px-4 border-[1px] border-black dark:border-white rounded-full hover:scale-105 active:scale-95 transition duration-150">
            delete
          </button>
        </div>
        <div>
          <p className="flex justify-center text-center text-md md:text-xl py-10">
            you just need to taste and rate it in our site. <br />
            one day we will be able to find <br className="block lg:hidden" />
            what is the best coffee for you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
