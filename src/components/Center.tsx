import React from "react";
import Image from "next/image";
import AuthProviders from "./AuthProviders";
import { getCurrentUser } from "@/lib/session";
import GetStartedButton from "./GetStartedButton";
import HowItWorks from "./HowItWorks";

const Center = async () => {
  const session = await getCurrentUser();
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 py-4">
      <div className="flex flex-col justify-center h-screen">
        <div className="flex flex-col justify-center items-center lg:items-start gap-4">
          <h1 className=" pl-10 text-7xl md:text-8xl lg:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tl from-yellow-900 from-30% to-rose-300 ">
            Koffy
          </h1>
          <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-900 md:pl-10">
            Your best coffee listing
          </p>
        </div>

        <div className="flex flex-row gap-4 pt-5 pl-10 justify-center lg:justify-start">
          {!session?.user ? (
            <>
              <GetStartedButton />
              <AuthProviders 
			  	bgColor="bg-pale-red"
				textColor="text-amber-800"
				hoverBgColor="hover:bg-amber-800"
				hoverTextColor="hover:text-pale-red"
				borderColor="border-amber-800"

			  />
            </>
          ) : (
            <HowItWorks />
          )}
        </div>
      </div>
      <div className=" flex justify-center items-center px-10 md:px-10 lg:px-0 xl:px-0 2xl:px-0">
        <div className="h-[100%] w-full bg-pale-red flex justify-center items-center rounded-3xl md:rounded-3xl lg:rounded-r-none xl:rounded-r-none 2xl:rounded-r-none">
          <Image
            src="/café-wallaga.png"
            alt="coffe-beans"
            width={700}
            height={700}
          />
        </div>
      </div>
    </div>
  );
};

export default Center;

//  bg-gradient-to-br to-amber-800 from-pale-red shadow-2xl shadow-amber-800
