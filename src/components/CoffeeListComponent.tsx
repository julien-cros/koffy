"use client";

import { ArrowLeftIcon, SquaresPlusIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import React from "react";
import Card from "./Card";
import { PostInterface } from "./ExpandedCard";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";
import Link from "next/link";

type Props = {
  posts?: PostInterface[] | null;
  isLogged: boolean;
};

const CoffeeListComponent = ({ posts, isLogged }: Props) => {
  const router = useRouter();

  const AlertBox = () => {
    Swal.fire({
      icon: "warning",
      title: "You need to be logged in to create a card",
      showCloseButton: true,
      timer: 10000,
      timerProgressBar: true,
      showConfirmButton: true,
      confirmButtonColor: "#c2410c",
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
      <div className="flex  justify-between items-center">
        <div className="flex flex-row items-center gap-2">
          <button onClick={() => router.back()}>
            <ArrowLeftIcon className="w-5 h-5 md:w-7 md:h-7 lg:w-10 lg:h-10  cursor-pointer hover:scale-105 transition duration-150 active:scale-95" />
          </button>

          <p className="text-2xl md:text-3xl lg:text-5xl flex flex-grow font-extrabold text-transparent bg-clip-text bg-gradient-to-tl from-yellow-900 from-50% to-rose-300">
            My coffee list
          </p>
        </div>
        <div className="flex justify-end mr-0 md:mr-5 lg:mr-10 xl:mr-10">
          <button
            onClick={
              !isLogged ? () => AlertBox() : () => router.push("/create-card")
            }
          >
            <SquaresPlusIcon className="w-10 h-10  text-yellow-800 cursor-pointer hover:scale-105 transition duration-150 active:scale-95 " />
          </button>
        </div>
      </div>
      <div className="mt-20 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-items-center gap-10">
        {posts?.map((post) => (
          <div
            key={post.id}
            onClick={() => router.push(`/coffee-list/${post.id}`)}
          >
            <Card
              key={post.id}
              title={post?.title}
              brand={post?.brand}
              tasting={post?.tasting}
              createdAt={post?.createdAt}
              rate={post?.rate}
              color={post?.color}
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
            color="bg-pale-red"
          />
        )}
      </div>
    </div>
  );
};

export default CoffeeListComponent;
