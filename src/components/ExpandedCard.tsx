"use client";

import React, { useState } from "react";
import HearthRate from "./HearthRate";
import ExpandCardInput from "./ExpandCardInput";
import { AdjustmentsHorizontalIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import { updatePost } from "@/app/create-card/actions";
import HearthInput from "./HearthInput";
import WeightInput from "./WeightInput";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  ArrowUpOnSquareIcon,
  CheckIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

export type PostInterface = {
  id: string;
  title: string;
  brand: string;
  variety: string;
  tasting: string | null;
  rate: number;
  note: string | null;
  price: string | null;
  weight: string | null;
  createdAt: Date;
  updatedAt: Date;
  status: boolean | null;
  color: string | null;
};

type ExpandedCardProps = {
  post: PostInterface | null;
  id: string;
  isMine: boolean;
};

enum ModalAction {
  UPDATE = "update",
  DELETE = "delete",
}

const ExpandedCard = ({ post, id, isMine }: ExpandedCardProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [rate, setRate] = React.useState<number>(1);
  const [type, setType] = React.useState<ModalAction>(ModalAction.UPDATE);
  const [clicked, setClicked] = useState(false);
	const router = useRouter();

  type AlertProps = {
    message: string;
    icon: any;
    messageButton?: string;
  };

  const AlertBox = ({ message, icon, messageButton }: AlertProps) => {
    Swal.fire({
      icon: icon,
      title: message,
      showCloseButton: true,
      timer: 10000,
      timerProgressBar: true,
      showConfirmButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: messageButton,
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/coffee-list";
      } else {
        window.location.href = "/coffee-list";
      }
    });
  };

  const areYouSure = async (type: ModalAction): Promise<boolean> => {
    return new Promise(async (resolve) => {
      switch (type) {
        case ModalAction.DELETE: {
          return Swal.fire({
            icon: "warning",
            title: "Are you sure you want to delete this post?",
            showCloseButton: true,
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: "#4ade80",
            confirmButtonText: "Yes",
            cancelButtonColor: "#ef4444",
            cancelButtonText: "No",
          }).then((result) => {
            if (result.isConfirmed) {
              resolve(true);
            } else {
              resolve(false);
            }
          });
        }
        case ModalAction.UPDATE: {
          resolve(true);
        }
				default: {
					resolve(false);
				}
      }
    });
  };

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
    weight: post?.weight || "",
    status: post?.status || false,
    uptdatedAt: post?.updatedAt || new Date(),
    color: post?.color || "bg-pale-red",
  });

  const handleStateChange = (
    fieldName: string,
    value: string | number | boolean,
  ) => {
    setForm({ ...form, [fieldName]: value });
  };

  function isAlphanumeric(str: string) {
    return (
      str.match(/(^[A-Za-z0-9- .@$#%&.,<>"';:!?()/]*$|[à-ü]|[À-Ü]|^$)/) !== null
    );
  }

  function refreshPage() {
    window.location.reload();
  }

  const onSubmit = async () => {

    if (!isMine) {
      AlertBox({
        message: "You can't update this post",
        icon: "error",
        messageButton: "Got it!",
      });
      setSubmitting(false);
      return;
    }
    if (form.title === "" || form.title === null) {
      AlertBox({
        message: "Title is required!",
        icon: "error",
        messageButton: "Got it!",
      });
      setSubmitting(false);
      return;
    } else if (
      isAlphanumeric(form?.title) === false ||
      isAlphanumeric(form?.brand) === false ||
      isAlphanumeric(form?.variety) === false ||
      isAlphanumeric(form?.tasting) === false ||
      isAlphanumeric(form?.note) === false ||
      isAlphanumeric(form?.weight) === false
    ) {
      AlertBox({
        message: "Only alphanumeric characters are allowed!",
        icon: "error",
        messageButton: "Got it!",
      });
      setSubmitting(false);
      return;
    }

    if (await areYouSure(type)) {
      const updatedPost = await updatePost(id, form, type);
      if (updatedPost && type === ModalAction.UPDATE) {
        refreshPage();
        setSubmitting(false);
      } else if (updatedPost && type === ModalAction.DELETE) {
        AlertBox({
          message: "Post deleted",
          icon: "success",
          messageButton: "ok",
        });
      } else {
        AlertBox({
          message: "Failed to update",
          icon: "error",
          messageButton: "ok",
        });
      }
    } else {
      setSubmitting(false);
    }
  };

  const copyClipboard = (id: string) => {
    setClicked(true);

    navigator.clipboard.writeText(
      `${window.location.origin}` + `/coffee-list/${id}`,
    );
    () => {
      handleStateChange("status", !form.status);
    };
    () => copyClipboard(id);
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 1000);
  };

	const pushBack = () => {
		router.back();
	}

  return (
    <form action={onSubmit}>
      <div className=" w-full h-full items-center">
        <div className="flex flex-row justify-between items-center p-10">
          <label onClick={() => pushBack()} className="flex items-center gap-2">
						<ArrowLeftIcon className="w-5 h-5 md:w-7 md:h-7 lg:w-10 lg:h-10 cursor-pointer hover:scale-105 transition duration-150 active:scale-95" />
					<p className="text-2xl md:text-3xl lg:text-5xl font-light">
            details
          </p>
					</label>
          <div className={`${isMine ? "block" : "hidden"}`}>
            <div className="flex flex-row gap-10 justify-center items-center">
              <div className=" flex flex-col justify-center items-center ">
                <div className=" text-center text-xs ">
                  {form.status ? "Public" : "Private"}
                </div>
                <label className="relative items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    disabled={!submitting}
                    checked={form.status}
                    onClick={() => handleStateChange("status", !form.status)}
                  />
                  <div
                    className={`rounded-full outline-none duration-1000 after:duration-300 w-16 h-8 border-[1px] border-black
							peer-focus:outline-none  after:content-[''] after:rounded-full peer-checked:border-none after:absolute after:bg-black after:outline-none after:h-6 after:w-6 after:top-1 after:left-1   
							peer-checked:after:translate-x-8 peer-hover:after:scale-95 peer-checked:bg-orange-500`}
                  ></div>
                </label>
              </div>
              <div className='flex justify-end mr-0 md:mr-5 lg:mr-10 xl:mr-10"'>
                <AdjustmentsHorizontalIcon
                  className="w-10 h-10 flex justify-end tcursor-pointer hover:scale-105 transition duration-150 active:scale-95 "
                  onClick={() => setSubmitting(!submitting)}
                />
              </div>
            </div>
          </div>
        </div>
        {/* card */}
        <div className=" w-full h-full flex justify-center items-center py-20 relative">
          <div
            className={`w-3/4 max-w-xl h-fit rounded-xl break-words dark:bg-gradient-to-br border-black border-[1px] dark:from-neutral-700 dark:to-black p-px`}
          >
            <div
              className={`w-full h-full bg-white dark:bg-black rounded-xl p-4 md:p-6 relative`}
            >
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
                      maxLength={30}
                      isRequierd={false}
                    />
                  ) : (
                    <p className="">{post?.title}</p>
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
                      maxLength={30}
                      isRequierd={false}
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
                      maxLength={30}
                      isRequierd={false}
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
                    maxLength={400}
                    isRequierd={false}
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
                    maxLength={400}
                    isRequierd={false}
                  />
                ) : (
                  <p className="pl-3 pt-3">{post?.note}</p>
                )}

                {/* price */}
                <div className="flex flex-row  items-center pt-10">
                  {submitting ? (
                    <div className="flex">
                      <ExpandCardInput
                        placeholder="$"
                        type="price"
                        isTextArea={false}
                        text={post?.price}
                        submitting={submitting}
                        setChange={handleStateChange}
                        maxLength={5}
                        isRequierd={false}
                      />
                      <WeightInput
                        isUpdate={true}
                        setState={(value) => handleStateChange("weight", value)}
                      />
                    </div>
                  ) : (
                    <p className="pl-1">
                      {post?.price} / {post?.weight}
                    </p>
                  )}
                </div>
                <div className="flex justify-center items-center py-10 ">
                  <div className="w-1/2 border-b-[1px] border-black dark:border-white"></div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center ">
                  {submitting ? (
                    <HearthInput rate={rate} setRate={submitRate} />
                  ) : (
                    <HearthRate rate={post?.rate} />
                  )}
                  <h2 className="py-10 sm:pt-10">
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
						<div className="border-b-[1px] border-black dark:border-white w-full mb-16"/>
          <label
					 className="absolute bottom-5 md:bottom-10 md:left-10 left-5 h-6 w-6 z-10 dark:text-white hover:scale-105"
          // TODO: add to account
          >
            <PlusCircleIcon className="h-6 w-6 md:w-8 md:h-8 hover:scale-105" />
          </label>
          <label onClick={() => copyClipboard(id)}
						className="absolute bottom-5 right-5 md:bottom-10 md:right-10 h-6 w-6 z-10 dark:text-white hover:scale-105"
					>
            
              {clicked ? (
                <CheckIcon className="h-6 w-6 md:w-8 md:h-8" />
              ) : (
                <ArrowUpOnSquareIcon className="h-6 w-6 md:w-8 md:h-8" />
              )}
          </label>
          </div>
            </div>
        </div>
        {submitting && (
          <div className="flex justify-between px-20 pb-20 items-center">
            <button
              className="text-sm md:text-lg lg:text-lg border-[1px] border-black dark:border-white px-3 py-2 rounded-full hover:scale-105 active:scale-95 transition duration-150"
              onClick={() => {
                setType(ModalAction.DELETE);
              }}
            >
              Delete
            </button>
            <button
              className="text-sm md:text-lg lg:text-lg border-[1px] border-black dark:border-white px-3 py-2  rounded-full hover:scale-105 active:scale-95 transition duration-150"
              onClick={() => setType(ModalAction.UPDATE)}
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
