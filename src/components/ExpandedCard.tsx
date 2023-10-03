"use client";

import React, { useState } from "react";
import HearthRate from "./HearthRate";
import ExpandCardInput from "./ExpandCardInput";
import { AdjustmentsHorizontalIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import { updatePost } from "@/app/create-card/actions";
import HearthInput from "./HearthInput";
import { useRouter } from "next/navigation";
import Link from "next/link";

export type PostInterface = {
  id: string;
  title: string | null;
  brand: string | null;
  variety: string | null;
  tasting: string | null;
  rate: number | null;
  note: string | null;
  price: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type ExpandedCardProps = {
  post: PostInterface | null;
  id: string;
};

const ExpandedCard = ({ post, id }: ExpandedCardProps) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [rate, setRate] = React.useState<number>(1);
  const [type, setType] = React.useState<string>("update");

  const submitRate = (rate: number) => {
    setRate(rate);
    handleStateChange("rate", rate);
  };

  const [form, setForm] = useState({
    title: post?.title || "",
    brand: post?.brand || "",
    variety: post?.variety || "",
    tasting: post?.tasting || "",
    rate: post?.rate || 1,
    note: post?.note || "",
    price: post?.price || "",
    uptdatedAt: post?.updatedAt || new Date(),
  });

  const handleStateChange = (fieldName: string, value: string | number) => {
    setForm({ ...form, [fieldName]: value });
  };

  const onSubmit = async () => {
    const updatedPost = await updatePost(id, form, type);
    if (updatedPost) {
      router.push("/coffee-list");
    } else {
      alert("Failed to update");
    }
  };

  return (
    <form action={onSubmit}>
      <div className=" w-full h-full items-center">
        <div className="grid grid-cols-2 items-center p-10">
			<div className="flex flex-row items-center gap-2">
				<Link href={"/coffee-list"}>
					<ArrowLeftIcon
						width={30}
						height={30}
						className="cursor-pointer hover:scale-105 transition duration-150 active:scale-95"
					/>
				</Link>
				<p className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tl from-yellow-900 from-50% to-rose-300">
					Details
				</p>
			</div>
          <div className='flex justify-end mr-0 md:mr-5 lg:mr-10 xl:mr-10"'>
            <AdjustmentsHorizontalIcon
              className="w-10 h-10 flex justify-end text-yellow-800 cursor-pointer hover:scale-105 transition duration-150 active:scale-95 "
              onClick={() => setSubmitting(!submitting)}
            />
          </div>
        </div>
        {/* card */}
        <div className=" w-full h-full flex justify-center items-center py-20">
          <div className="w-3/4 max-w-xl h-fit bg-slate-200 rounded-xl shadow-2xl">
            <div className="flex flex-col pl-10 pr-10">
              {/* title */}
              <div className="flex justify-start pt-10 text-3xl font-bold">
                {submitting ? (
                  <ExpandCardInput
                    placeholder="Title"
                    type="title"
                    isTextArea={false}
                    submitting={submitting}
                    text={post?.title}
                    setChange={handleStateChange}
                  />
                ) : (
                  <p>{post?.title}</p>
                )}
              </div>

              {/* brand and variety */}
              <div className="text-xl pt-5 font-normal flex justify-between">
                {submitting ? (
                  <ExpandCardInput
                    placeholder="Brand"
                    type="brand"
                    isTextArea={false}
                    submitting={submitting}
                    text={post?.brand}
                    setChange={handleStateChange}
                  />
                ) : (
                  <p>{post?.brand}</p>
                )}
                {submitting ? (
                  <ExpandCardInput
                    placeholder="Variety"
                    type="variety"
                    isTextArea={false}
                    text={post?.variety}
                    submitting={submitting}
                    setChange={handleStateChange}
                  />
                ) : (
                  <p>{post?.variety}</p>
                )}
              </div>

              {/* tasting */}
              <p className="pt-10">Tasting: </p>
              {submitting ? (
                <ExpandCardInput
                  placeholder="There is no tasting"
                  type="tasting"
                  isTextArea={true}
                  text={post?.tasting}
                  submitting={submitting}
                  setChange={handleStateChange}
                />
              ) : (
                <p className="pl-2 break-words">{post?.tasting}</p>
              )}

              {/* note */}
              <p className="pt-10">Note: </p>
              {submitting ? (
                <ExpandCardInput
                  placeholder="There is no note"
                  type="note"
                  isTextArea={true}
                  text={post?.note}
                  submitting={submitting}
                  setChange={handleStateChange}
                />
              ) : (
                <p className="pl-3 pt-3">{post?.note}</p>
              )}

              {/* price */}
              <div className="flex flex-row  items-center pt-10">
                {submitting ? (
                  <ExpandCardInput
                    placeholder="$"
                    type="price"
                    isTextArea={false}
                    text={post?.price}
                    submitting={submitting}
                    setChange={handleStateChange}
                  />
                ) : (
                  <p className="pl-1">{post?.price}$ /kg</p>
                )}
              </div>
              <div className="flex justify-center items-center py-10 ">
                <div className="w-1/2 border-b-[1px] border-slate-400"></div>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center ">
                {submitting ? (
                  <HearthInput rate={rate} setRate={submitRate} />
                ) : (
                  <HearthRate rate={post?.rate} />
                )}
                <h2 className=" pb-10 sm:pt-10">
                  <p>
                    Last Update:{" "}
                    {post?.updatedAt
                      ?.toJSON()
                      .slice(0, 10)
                      .split("-")
                      .reverse()
                      .join("/")}
                  </p>
                  <p>
                    Created the:{" "}
                    {post?.createdAt
                      ?.toJSON()
                      .slice(0, 10)
                      .split("-")
                      .reverse()
                      .join("/")}
                  </p>
                </h2>
              </div>
            </div>
          </div>
        </div>
        {submitting && (
          <div className="flex justify-between px-20 pb-20 items-center">
            <button
              className="text-xl text-pale-red py-2 px-4 bg-red-400 rounded-full shadow-md hover:scale-105 active:scale-95 active:shadow-lg transition duration-150"
              onClick={() => setType("delete")}
            >
              Delete
            </button>
            <button
              className=" text-xl text-pale-red py-2 px-4 bg-amber-800 rounded-full shadow-md hover:scale-105 active:scale-95 active:shadow-lg transition duration-150"
              onClick={() => setType("update")}
            >
              Update
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default ExpandedCard;
