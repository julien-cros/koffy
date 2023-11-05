import React from "react";
import AuthProviders from "./AuthProviders";
import { getCurrentUser } from "@/lib/session";
import Link from "next/link";
import HowItWorks from "./HowItWorksButton";
import DisplayCard from "./DisplayCard";

const Center = async () => {
  const session = await getCurrentUser();
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 py-4">
      <div className="flex flex-col justify-center h-screen">
        <div className="flex flex-col justify-center items-center lg:items-start gap-4">
          <h1 className=" pl-0 md:pl-10  text-7xl md:text-8xl lg:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tl from-yellow-900 from-30% to-rose-300 ">
            Koffy
          </h1>
          <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-900 md:pl-10 text-center lg:text-left mr-3">
            always keep a record of your coffee
          </p>
        </div>

        <div className="flex flex-row gap-4 pt-5 pl-0 md:pl-10 justify-center lg:justify-start">
          {!session?.user ? (
            <>
              <Link
                href={`/coffee-list`}
                className="rounded-full tracking-wide px-4 py-2 text-pale-red bg-amber-800  hover:text-amber-800 border-amber-800 border-none hover:scale-105 transition duration-105 ease-out active:scale-95 shadow-lg hover:bg-pale-red  active:shadow-xl  text-xs md:text-sm"
              >
                coffee list
              </Link>
              <AuthProviders
                bgColor="bg-pale-red"
                textColor="text-amber-800"
                hoverBgColor="hover:bg-amber-800"
                hoverTextColor="hover:text-pale-red"
                borderColor="border-amber-800"
              />
            </>
          ) : (
            <>
              <Link
                href={`/coffee-list`}
                className="rounded-full tracking-wide px-4 py-2 text-pale-red bg-amber-800
				 hover:bg-pale-red hover:text-amber-800  hover:scale-105 transition duration-105
				 	 ease-out active:scale-95 shadow-lg active:shadow-xl text-xs md:text-sm"
              >
                coffee list
              </Link>
              <HowItWorks />
            </>
          )}
        </div>
      </div>
      <div className=" flex justify-center items-center px-10 md:px-10 lg:px-0 xl:px-0 2xl:px-0">
        <div className="h-[500px] lg:h-[100%] w-full bg-pale-red flex justify-center items-center rounded-3xl md:rounded-3xl lg:rounded-r-none xl:rounded-r-none 2xl:rounded-r-none">
		  <DisplayCard />
        </div>
      </div>
    </div>
  );
};

export default Center;
