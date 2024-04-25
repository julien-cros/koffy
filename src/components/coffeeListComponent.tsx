"use client";

import { SquaresPlusIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import React from "react";
import Card from "./card";
import type { PostInterface } from "./expandedCard";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";
import Link from "next/link";
import PushBackButton from "./pushBackButton";
import type { SessionInterface } from "@/lib/session";

type Props = {
  posts?: PostInterface[] | null;
  isLogged: boolean;
  session: SessionInterface | null;
};

const CoffeeListComponent = ({ posts, isLogged, session }: Props) => {
  const router = useRouter();

  const AlertBox = () => {
    Swal.fire({
      icon: "warning",
      title: "You need to be logged in to create a card",
      showCloseButton: true,
      timer: 10000,
      timerProgressBar: true,
      showConfirmButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Sign in",
    }).then((result) => {
      if (result.isConfirmed) {
        signIn("google");
      } else {
        <Link href="/" />;
      }
    });
  };

  return (
    <div className="flex flex-col justify-center m-10">
      <div className="flex justify-between items-center">
        <div className="flex flex-row items-center gap-2">
          <PushBackButton />
          <p className="text-2xl md:text-3xl lg:text-5xl flex flex-grow font-light">
            my coffee list
          </p>
        </div>

        <div className="flex justify-end mr-0 md:mr-5 lg:mr-10 xl:mr-10 gap-2">
          <Link
            href={`/search-page/brand--public`}
            className="border-[1px] border-black dark:border-white px-3 py-2 rounded-full text-sm cursor-pointer"
          >
            see all
          </Link>
          <button
            onClick={
              !isLogged ? () => AlertBox() : () => router.push("/create-card")
            }
          >
            <SquaresPlusIcon className="w-8x h-8 cursor-pointer hover:scale-105 transition duration-150 active:scale-95 " />
          </button>
        </div>
      </div>
      <div className="mt-20 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-items-center gap-10">
        {posts?.map((post) => (
          <div key={post.id}>
            <Card
              key={post.id}
              title={post.title}
              brand={post.brand}
              tasting={post?.tasting}
              createdAt={post?.createdAt}
              rate={post.rate}
              id={post.id}
              session={session}
              clickable={true}
            />
          </div>
        ))}
        {!posts && (
          <Card
            key={0}
            title="No coffee yet"
            brand="future Brand"
            tasting="Taste a  coffe and rate it"
            rate={4}
            createdAt={new Date()}
            id=""
            clickable={false}
          />
        )}
      </div>
    </div>
  );
};

export default CoffeeListComponent;
