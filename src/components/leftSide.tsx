"use client";

import {
  BookmarkIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  ExclamationCircleIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { SquaresPlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import SignOutButton from "./signOutButton";
import AuthProviders from "./authProviders";
import { useEffect, useState } from "react";

export default function LeftSide({ session }: { session: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const [NeedPlace, setNeedPlace] = useState(false);

  useEffect(() => {
    console.log(pathname);
    if (pathname === "/create-card" || pathname.includes("profile")) {
      setNeedPlace(true);
    } else {
      setNeedPlace(false);
    }
  }, [pathname]);
  // return (
  //   <div className="hidden md:block h-screen fixed lg:pr-10 w-60 pt-10 md:pt-24">
  //     {/* TODO: test some border to get greates style*/}
  //     <div className="flex flex-col justify-start lg:items-start items-end border-r-[1px]">
  //       <Link
  //         href="/"
  //         className="px-3 py-3 cursor-pointer transition duration-100 dark:hover:bg-neutral-800 hover:bg-neutral-200 w-14 rounded-lg mr-5 flex justify-center"
  //       >
  //         <img
  //           src="/coffee.png"
  //           alt="logo"
  //           width={24}
  //           height={24}
  //           className="dark:invert"
  //         />
  //       </Link>
  //       <div className="w-full flex flex-col items-end space-y-1 md:pr-5">
  //         <Link
  //           href="/"
  //           className="lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
  //         >
  //           <HomeIcon className="w-8 h-8" />
  //           <p className="hidden lg:block text-lg">Home</p>
  //         </Link>
  //         <button
  //           className="lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
  //           onClick={
  //             session?.user
  //               ? () => router.push("/create-card")
  //               : () => alert("Please sign in to create a card")
  //           }
  //         >
  //           <SquaresPlusIcon className="w-8 h-8" />
  //           <p className="hidden lg:block text-lg">Create</p>
  //         </button>
  //         <Link
  //           href="/coffee-list"
  //           className="lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
  //         >
  //           <ClipboardDocumentListIcon className="w-8 h-8" />
  //           <p className="hidden lg:block text-lg">Coffee List</p>
  //         </Link>
  //         <Link
  //           href="/about"
  //           className="lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
  //         >
  //           <ExclamationCircleIcon className="w-8 h-8 rotate-180" />
  //           <p className="hidden lg:block text-lg">About</p>
  //         </Link>
  //         <Link
  //           href="/saves"
  //           className="lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
  //         >
  //           <BookmarkIcon className="w-8 h-8" />
  //           <p className="hidden lg:block text-lg">Saves</p>
  //         </Link>
  //         {session?.user ? (
  //           <SignOutButton
  //             name={session?.user?.name}
  //             style={
  //               "lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
  //             }
  //           />
  //         ) : (
  //           <AuthProviders
  //             style={
  //               "lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
  //             }
  //           />
  //         )}
  //         <Link
  //           href="/settings"
  //           className="lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
  //         >
  //           <Cog6ToothIcon className="w-8 h-8" />
  //           <p className="hidden lg:block text-lg">Settings</p>
  //         </Link>
  //         {session?.user && (
  //           <Link
  //             href={`/profile/${session?.user?.name}`}
  //             className="lg:w-full w-14 flex flex-row items-center cursor-pointer gap-2 transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3"
  //           >
  //             {session?.user.avatar ? (
  //               <img
  //                 src={session?.user.avatar}
  //                 alt="avatar"
  //                 width={32}
  //                 height={32}
  //                 className="rounded-full flex justify-end items-end"
  //               />
  //             ) : (
  //               <UserIcon className="w-8 h-8" />
  //             )}
  //             <p className="hidden lg:block text-lg">Profile</p>
  //           </Link>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );
  // <div className={`${NeedPlace ? "LeftSideStart" : "LeftSideEnd"}`}>
  return (
    <div className="w-full h-full flex flex-row fixed pt-24 pr-5">
      <div className="flex flex-1 relative">
        <div className="w-full h-full">
          <div
            className={`absolute ${
              NeedPlace ? "LeftSideStart" : "LeftSideEnd"
            }`}
          >
            <div className=" w-fit flex flex-col justify-start lg:items-start items-end border-r-[1px]">
              <Link
                href="/"
                className="px-3 py-3 cursor-pointer transition duration-100 dark:hover:bg-neutral-800 hover:bg-neutral-200 w-14 rounded-lg mr-5 flex justify-center"
              >
                <img
                  src="/coffee.png"
                  alt="logo"
                  width={24}
                  height={24}
                  className="dark:invert"
                />
              </Link>
              <div className="w-full flex flex-col items-end space-y-1 md:pr-5">
                <Link
                  href="/"
                  className="lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
                >
                  <HomeIcon className="w-8 h-8" />
                  <p className="hidden lg:block text-lg">Home</p>
                </Link>
                <button
                  className="lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
                  onClick={
                    session?.user
                      ? () => router.push("/create-card")
                      : () => alert("Please sign in to create a card")
                  }
                >
                  <SquaresPlusIcon className="w-8 h-8" />
                  <p className="hidden lg:block text-lg">Create</p>
                </button>
                <Link
                  href="/coffee-list"
                  className="lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
                >
                  <ClipboardDocumentListIcon className="w-8 h-8" />
                  <p className="hidden lg:block text-lg">Coffee List</p>
                </Link>
                <Link
                  href="/saves"
                  className="lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
                >
                  <BookmarkIcon className="w-8 h-8" />
                  <p className="hidden lg:block text-lg">Saves</p>
                </Link>
                {session?.user && (
                  <Link
                    href={`/profile/${session?.user?.name}`}
                    className="lg:w-full w-14 flex flex-row items-center cursor-pointer gap-2 transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3"
                  >
                    {session?.user.avatar ? (
                      <img
                        src={session?.user.avatar}
                        alt="avatar"
                        width={32}
                        height={32}
                        className="rounded-full flex justify-end items-end"
                      />
                    ) : (
                      <UserIcon className="w-8 h-8" />
                    )}
                    <p className="hidden lg:block text-lg">Profile</p>
                  </Link>
                )}
                <Link
                  href="/about"
                  className="lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
                >
                  <ExclamationCircleIcon className="w-8 h-8 rotate-180" />
                  <p className="hidden lg:block text-lg">About</p>
                </Link>
                <Link
                  href="/settings"
                  className="lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
                >
                  <Cog6ToothIcon className="w-8 h-8" />
                  <p className="hidden lg:block text-lg">Settings</p>
                </Link>
                {session?.user ? (
                  <SignOutButton
                    name={session?.user?.name}
                    style={
                      "lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
                    }
                  />
                ) : (
                  <AuthProviders
                    style={
                      "lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-none md:w-[400px] lg:w-[500px] transition duration-100 transition-width">
        {/* code for the sidebar */}
      </div>
      <div className="flex flex-1"></div>
    </div>
  );
}

// <div className="w-full h-full flex flex-row">
//   <div className={`flex flex-1 relative md:mr-[400px] lg:mr-[500px] `}>
//     <div className="w-full flex flex-1 ">
//       <div className="absolute justify-end">
//         <div className="hidden md:block h-screen fixed lg:pr-10 w-60 pt-10 md:pt-24">
//           {/* TODO: test some border to get greates style*/}
//           <div className="flex flex-col justify-start lg:items-start items-end border-r-[1px]">
//             <Link
//               href="/"
//               className="px-3 py-3 cursor-pointer transition duration-100 dark:hover:bg-neutral-800 hover:bg-neutral-200 w-14 rounded-lg mr-5 flex justify-center"
//             >
//               <img
//                 src="/coffee.png"
//                 alt="logo"
//                 width={24}
//                 height={24}
//                 className="dark:invert"
//               />
//             </Link>
//             <div className="w-full flex flex-col items-end space-y-1 md:pr-5">
//               <Link
//                 href="/"
//                 className="lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
//               >
//                 <HomeIcon className="w-8 h-8" />
//                 <p className="hidden lg:block text-lg">Home</p>
//               </Link>
//               <button
//                 className="lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
//                 onClick={
//                   session?.user
//                     ? () => router.push("/create-card")
//                     : () => alert("Please sign in to create a card")
//                 }
//               >
//                 <SquaresPlusIcon className="w-8 h-8" />
//                 <p className="hidden lg:block text-lg">Create</p>
//               </button>
//               <Link
//                 href="/coffee-list"
//                 className="lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
//               >
//                 <ClipboardDocumentListIcon className="w-8 h-8" />
//                 <p className="hidden lg:block text-lg">Coffee List</p>
//               </Link>
//               <Link
//                 href="/about"
//                 className="lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
//               >
//                 <ExclamationCircleIcon className="w-8 h-8 rotate-180" />
//                 <p className="hidden lg:block text-lg">About</p>
//               </Link>
//               <Link
//                 href="/saves"
//                 className="lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
//               >
//                 <BookmarkIcon className="w-8 h-8" />
//                 <p className="hidden lg:block text-lg">Saves</p>
//               </Link>
//               {session?.user ? (
//                 <SignOutButton
//                   name={session?.user?.name}
//                   style={
//                     "lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
//                   }
//                 />
//               ) : (
//                 <AuthProviders
//                   style={
//                     "lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
//                   }
//                 />
//               )}
//               <Link
//                 href="/settings"
//                 className="lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
//               >
//                 <Cog6ToothIcon className="w-8 h-8" />
//                 <p className="hidden lg:block text-lg">Settings</p>
//               </Link>
//               {session?.user && (
//                 <Link
//                   href={`/profile/${session?.user?.name}`}
//                   className="lg:w-full w-14 flex flex-row items-center cursor-pointer gap-2 transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3"
//                 >
//                   {session?.user.avatar ? (
//                     <img
//                       src={session?.user.avatar}
//                       alt="avatar"
//                       width={32}
//                       height={32}
//                       className="rounded-full flex justify-end items-end"
//                     />
//                   ) : (
//                     <UserIcon className="w-8 h-8" />
//                   )}
//                   <p className="hidden lg:block text-lg">Profile</p>
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//   <div className="flex flex-1 justify-center items-center">
//     <div className=" md:w-[400px] lg:w-[500px] transition duration-100 transition-width">
//       ok
//     </div>
//   </div>
//   {/* <div className="flex flex-1"></div> */}
// </div>
