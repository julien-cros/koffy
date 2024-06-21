"use client";

import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  BookmarkIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  ExclamationCircleIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { SquaresPlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SignOutButton from "./signOutButton";
import AuthProviders from "./authProviders";
import { SessionInterface } from "@/app/types/types";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { signIn, signOut } from "next-auth/react";
import { useState } from "react";
import SearchPageMobile from "./searchPageMobile";
import Image from "next/image";

export default function PlusButton({
  session,
}: {
  session: SessionInterface | null | undefined;
}) {
  return (
    <div className="">
      <Menu>
        <MenuButton className="inline-flex py-3">
          <Bars3Icon className="w-7" />
        </MenuButton>
        <Transition
          enter="transition ease-out duration-75"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <MenuItems
            anchor="top end"
            className="w-44 z-50 origin-bottom-right rounded-lg border border-black dark:border-white  bg-white/50 dark:bg-black/50 p-1 backdrop-blur-sm text-sm/6 text-black dark:text-white [--anchor-gap:var(--spacing-1)] focus:outline-none outline-none"
            onScroll={(e) => e.stopPropagation()}
          >
            <MenuItem>
              <Link
                href="/about"
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
              >
                <ExclamationCircleIcon className=" w-5 rotate-180" />
                About
              </Link>
            </MenuItem>
            <MenuItem>
              {session?.user ? (
                <button
                  className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                  onClick={() => signOut()}
                >
                  <ArrowRightOnRectangleIcon className="w-5" />
                  Sign Out
                </button>
              ) : (
                <button
                  className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                  onClick={() => signIn()}
                >
                  <ArrowLeftOnRectangleIcon className="w-5" />
                  Sign In
                </button>
              )}
            </MenuItem>
            <MenuItem>
              <Link
                href="/saved"
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
              >
                <BookmarkIcon className="w-5" />
                Saved
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                href="/settings"
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
              >
                <Cog6ToothIcon className="w-5" />
                Settings
              </Link>
            </MenuItem>
            {session?.user && (
              <MenuItem>
                <Link
                  className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                  href={`/profile/${session.user.name}`}
                >
                  <Image
                    src={session.user.avatar || "/images/default-profile.svg"}
                    alt="profile-image"
                    className="w-5 h-5 rounded-full"
                  />
                  Profile
                </Link>
              </MenuItem>
            )}
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
}

export function LeftSide({
  session,
}: {
  session: SessionInterface | null | undefined;
}) {
  const router = useRouter();
  const [searchPageOpen, setSearchPageOpen] = useState(false);

  // reactive sideBar dependig of the page
  // const pathname = usePathname();
  // const [NeedPlace, setNeedPlace] = useState(false);
  // useEffect(() => {
  //   console.log(pathname);
  //   if (pathname === "/create-card" || pathname.includes("profile")) {
  //     setNeedPlace(true);
  //   } else {
  //     setNeedPlace(false);
  //   }
  // }, [pathname]);

  return (
    <>
      <div className="hidden md:block h-screen fixed pt-16">
        {/* TODO: test some border to get greates style*/}

        <div className="w-56 flex flex-col items-end lg:items-start  space-y-1 md:pr-5">
          <Link
            href="/"
            className="px-3 py-3 cursor-pointer transition duration-100 dark:hover:bg-neutral-800 hover:bg-neutral-200 w-14 rounded-lg flex justify-center"
          >
            <Image
              src="/coffee.png"
              alt="logo"
              width={32}
              height={32}
              className="dark:invert"
            />
          </Link>
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
            href="/about"
            className="lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
          >
            <ExclamationCircleIcon className="w-8 h-8 rotate-180" />
            <p className="hidden lg:block text-lg">About</p>
          </Link>
          <Link
            href="/saved"
            className="lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
          >
            <BookmarkIcon className="w-8 h-8" />
            <p className="hidden lg:block text-lg">Saved</p>
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
          <Link
            href="/settings"
            className="lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
          >
            <Cog6ToothIcon className="w-8 h-8" />
            <p className="hidden lg:block text-lg">Settings</p>
          </Link>
          {session?.user && (
            <Link
              href={`/profile/${session?.user?.name}`}
              className="lg:w-full h-12 w-14 flex flex-row items-center cursor-pointer gap-2 transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3"
            >
              {session?.user.avatar ? (
                <Image
                  src={session?.user.avatar}
                  alt="avatar"
                  width={32}
                  height={32}
                  className="rounded-full flex justify-end items-end w-8 h-8"
                />
              ) : (
                <UserIcon className="w-8 h-8" />
              )}
              <p className="hidden lg:block text-lg">Profile</p>
            </Link>
          )}
        </div>
      </div>

      {/* Bottom Bar*/}
      <div className="md:hidden bottom-0 fixed w-full h-16 flex justify-around items-center bg-white/50 dark:bg-black/50 backdrop-blur-sm z-50">
        <Link href={"/"}>
          <HomeIcon className="w-7 h-7 cursor-pointer" />
        </Link>
        <Link href={"/coffee-list"}>
          <ClipboardDocumentListIcon className="w-7 h-7 cursor-pointer" />
        </Link>
        <SquaresPlusIcon
          className="w-7 h-7 cursor-pointer"
          onClick={
            session?.user
              ? () => router.push("/create-card")
              : () => alert("Please sign in to create a card")
          }
        />
        <button onClick={() => setSearchPageOpen(true)}>
          <MagnifyingGlassIcon className="w-7 h-7 cursor-pointer" />
        </button>
        <PlusButton session={session} />
      </div>
      {searchPageOpen && (
        <SearchPageMobile
          setSearchPageOpen={setSearchPageOpen}
          session={session}
        />
      )}
    </>
  );
}

// reactive sideBar dependig of the page
//   return (
//     <div
//       className="w-full h-full flex flex-row fixed pt-24 pr-5"
//       data-dasd="dasasd"
//     >
//       <div className="flex flex-1 relative bg-green-500 ">
//         <div className="w-full h-full relative">
//           <div
//             className={`absolute ${
//               NeedPlace ? "LeftSideStart" : "LeftSideEnd"
//             }`}
//           >
//             <div className="w-fit  lg:w-48 flex flex-col justify-start lg:items-start items-end border-r-[1px]">
//               <Link
//                 href="/"
//                 className="px-3 py-3 cursor-pointer transition duration-100 dark:hover:bg-neutral-800 hover:bg-neutral-200 w-14 rounded-lg mr-5 flex justify-center"
//               >
//                 <img
//                   src="/coffee.png"
//                   alt="logo"
//                   width={24}
//                   height={24}
//                   className="dark:invert"
//                 />
//               </Link>
//               <div className="w-full flex flex-col items-end space-y-1 md:pr-5">
//                 <Link
//                   href="/"
//                   className="lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
//                 >
//                   <HomeIcon className="w-8 h-8" />
//                   <p className="hidden lg:block text-lg">Home</p>
//                 </Link>
//                 <button
//                   className="lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
//                   onClick={
//                     session?.user
//                       ? () => router.push("/create-card")
//                       : () => alert("Please sign in to create a card")
//                   }
//                 >
//                   <SquaresPlusIcon className="w-8 h-8" />
//                   <p className="hidden lg:block text-lg">Create</p>
//                 </button>
//                 <Link
//                   href="/coffee-list"
//                   className="lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
//                 >
//                   <ClipboardDocumentListIcon className="w-8 h-8" />
//                   <p className="hidden lg:block text-lg">Coffee List</p>
//                 </Link>
//                 <Link
//                   href="/saves"
//                   className="lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
//                 >
//                   <BookmarkIcon className="w-8 h-8" />
//                   <p className="hidden lg:block text-lg">Saves</p>
//                 </Link>
//                 {session?.user && (
//                   <Link
//                     href={`/profile/${session?.user?.name}`}
//                     className="lg:w-full w-14 flex flex-row items-center cursor-pointer gap-2 transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3"
//                   >
//                     {session?.user.avatar ? (
//                       <img
//                         src={session?.user.avatar}
//                         alt="avatar"
//                         width={32}
//                         height={32}
//                         className="rounded-full flex justify-end items-end"
//                       />
//                     ) : (
//                       <UserIcon className="w-8 h-8" />
//                     )}
//                     <p className="hidden lg:block text-lg">Profile</p>
//                   </Link>
//                 )}
//                 <Link
//                   href="/about"
//                   className="lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
//                 >
//                   <ExclamationCircleIcon className="w-8 h-8 rotate-180" />
//                   <p className="hidden lg:block text-lg">About</p>
//                 </Link>
//                 <Link
//                   href="/settings"
//                   className="lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
//                 >
//                   <Cog6ToothIcon className="w-8 h-8" />
//                   <p className="hidden lg:block text-lg">Settings</p>
//                 </Link>
//                 {session?.user ? (
//                   <SignOutButton
//                     name={session?.user?.name}
//                     style={
//                       "lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
//                     }
//                   />
//                 ) : (
//                   <AuthProviders
//                     style={
//                       "lg:w-full w-14 cursor-pointer transition duration-100 hover:bg-opacity-80 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-lg py-2 px-3 flex flex-row items-center gap-2 lg:justify-start justify-center"
//                     }
//                   />
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="flex-none bg-red-500 md:w-[400px] lg:w-[500px] transition duration-100 transition-width relative">
//       </div>
//       <div className="relative flex flex-1 bg-blue-500"></div>
//     </div>
//   );
// }
