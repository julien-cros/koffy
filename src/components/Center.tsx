import React from "react";
import AuthProviders from "./AuthProviders";
import Link from "next/link";
import HowItWorks from "./HowItWorksButton";
import DisplayCard from "./DisplayCard";
import { getCurrentUser } from "@/lib/session";

const Center = async () => {
  const session = await getCurrentUser();
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 py-4">
      <div className="flex flex-col justify-center h-full md:h-screen">
        <div className="flex flex-col lg:items-start gap-4">
          <h1 className="pl-5 lg:pl-10  text-8xl lg:text-[250px] font-thin flex text-start	">
            Koffy
          </h1>
          <p className="text-3xl md:text-4xl lg:text-5xl pl-5 md:pl-10 text-start lg:text-left mr-3">
            always keep a record of your coffee
          </p>
        </div>

        <div className="flex flex-row gap-2 pt-2 md:pt-5 pl-0 md:pl-10 justify-center lg:justify-start">
          {!session?.user ? (
            <>
              <Link
                href={`/search-page/brand--public`}
                className="rounded-full flex items-center tracking-wide px-3 py-2 border-black dark:border-white border-[1px] text-xs md:text-sm"
              >
                all coffee
              </Link>
              <AuthProviders
                bgColor="bg-pale-red"
                textColor="text-amber-800"
                hoverBgColor="hover:bg-amber-800"
                hoverTextColor="hover:text-pale-red"
                borderColor="border-amber-800"
              />
							 <Link
                href={`/search-page/brand--public`}
                className="rounded-full flex items-center tracking-wide px-3 py-2 border-black dark:border-white border-[1px] text-xs md:text-sm"
              >
              	coffee list
              </Link>
            </>
          ) : (
            <>
							<HowItWorks />
							<Link
                href={`/search-page/brand--public`}
                className="rounded-full flex items-center tracking-wide px-3 py-2 bg-orange-500 dark:text-black text-xs md:text-sm"
              >
                all coffee
              </Link>
              <Link
                href={`/coffee-list`}
                className="rounded-full flex items-center tracking-wide px-3 py-2 border-black dark:border-white border-[1px] text-xs md:text-sm"
              >
                your coffee list
              </Link>
            </>
          )}
        </div>
      </div>
      <div className=" flex justify-center items-center mx-6 md:mx-10 lg:mx-0 xl:mx-0 2xl:mx-0 border-black dark:border-white border-t-[1px] md:border-none mt-5 ">
        <div
          className="h-[300px] lg:h-[100%] w-full mt-5
		 				flex justify-center items-center rounded-3xl md:rounded-3xl lg:rounded-r-none xl:rounded-r-none 2xl:rounded-r-none"
        >
          <DisplayCard />
        </div>
      </div>
    </div>
  );
};

export default Center;
