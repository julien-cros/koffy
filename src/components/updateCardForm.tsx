"use client";

import { FormState, SessionInterface } from "@/app/types/types";
import React, { useState } from "react";
import FormInput from "./formInput";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import WeightInput from "./weightInput";
import { generateUploadButton } from "@uploadthing/react";
import HearthInput from "./hearthInput";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { deleteImage, updatePost } from "@/app/create-card/actions";
import { useRouter } from "next/navigation";

type Props = {
  post: FormState;
  session: SessionInterface;
  postId: string;
};

enum ModalAction {
  UPDATE = "update",
  DELETE = "delete",
  CANCEL = "cancel",
}

export const UploadButton = generateUploadButton<OurFileRouter>();

const UpdateCardForm = ({ post, postId }: Props) => {
  const router = useRouter();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(post.status);
  const [imageKeyBuffer, setImageKeyBuffer] = useState("");
  const [imageUrlBuffer, setImageUrlBuffer] = useState(post.imageUrl);
  const [submitType, setSubmitType] = useState(ModalAction.UPDATE); // update, updateImage or delete
  const [rate, setRate] = useState(post.rate);

  const [form] = useState({
    title: post.title,
    brand: post.brand,
    price: post.price,
    tasting: post.tasting,
    note: post.note,
    variety: post.variety,
    rate: post.rate,
    status: post.status,
    weight: post.weight,
    country: post.country,
    domain: post.domain,
    altitude: post.altitude,
    process: post.process,
    type: post.type,
    imageUrl: post.imageUrl,
    imageKey: post.imageKey,
  });

  const handleFormChange = (
    key: keyof FormState,
    value: string | number | boolean,
  ) => {
    form[key] = value as never;

    if (key === "rate") {
      setRate(value as number);
    }
  };

  const handleFormSubmit = async (submitType: string) => {
    setSubmitting(true);
    if (post.imageUrl !== form.imageUrl) {
      deleteImage(post.imageKey);
      post.imageKey = imageKeyBuffer;
    }
    if (submitType === ModalAction.DELETE) {
      if (confirm("Are you sure you want to delete this post?") === false) {
        setSubmitting(false);
        return;
      }
    }
    const updatedPost = await updatePost(postId, form, submitType);
    if (updatedPost === true && submitType === ModalAction.UPDATE) {
      alert("Post updated successfully");
      setSubmitting(false);
      router.push(`/coffee-list/${postId}`);
    } else if (updatedPost === true && submitType === ModalAction.DELETE) {
      alert("Post deleted successfully");
      setSubmitting(false);
      router.push("/");
    } else {
      alert("An error occured, please try again later.");
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (imageKeyBuffer !== "") deleteImage(imageKeyBuffer);
    router.back();
  };

  const UpdateImage = (imageUrl: string, imageKey: string) => {
    if (imageKeyBuffer !== "") {
      deleteImage(imageKeyBuffer);
    }
    setImageKeyBuffer(imageKey);
    handleFormChange("imageUrl", imageUrl);
    setImageUrlBuffer(imageUrl);
  };

  return (
    <form
      action={() => handleFormSubmit(submitType)}
      onSubmit={() => {
        handleFormSubmit(submitType);
      }}
    >
      <div className="h-full w-full pt-24 p-10">
        <XMarkIcon
          className="w-6 h-6 cursor-pointer absolute top-10 right-10"
          onClick={() => handleCancel()}
        />
        <h3 className="flex justify-center  text-2xl md:text-3xl text-black dark:text-white font-light text-left max-w-5xl w-full">
          Update your coffee post
        </h3>
        <div className="p-10 justify-between items-center flex flex-col gap-5 ">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-3xl mx-5 h-full gap-4 gap-x-10">
            <FormInput
              type="text"
              title="Title"
              placeholder="Title"
              text={post.title}
              maxLength={30}
              setState={(value) => handleFormChange("title", value)}
              isRequierd={true}
              displayDefaultValue={true}
            />
            <FormInput
              type="text"
              title="Brand"
              placeholder="Brand"
              text={post.brand}
              maxLength={30}
              setState={(value) => handleFormChange("brand", value)}
              isRequierd={true}
              displayDefaultValue={true}
            />
            <FormInput
              type="text"
              title="Variety"
              placeholder="Variety"
              text={post?.variety}
              maxLength={30}
              setState={(value) => handleFormChange("variety", value)}
              isRequierd={true}
              displayDefaultValue={true}
            />
            <FormInput
              type="text"
              title="country"
              placeholder="Country"
              text={post?.country}
              maxLength={30}
              setState={(value) => handleFormChange("country", value)}
              isRequierd={false}
              displayDefaultValue={true}
            />
            <FormInput
              type="text"
              title="Tasting"
              placeholder="Comment Your Taste"
              text={post?.tasting}
              textArea
              maxLength={400}
              setState={(value) => handleFormChange("tasting", value)}
              isRequierd={false}
              displayDefaultValue={true}
            />
            <FormInput
              type="text"
              title="Note"
              placeholder="You can write a note here."
              text={post?.note}
              textArea
              maxLength={400}
              setState={(value) => handleFormChange("note", value)}
              isRequierd={false}
              displayDefaultValue={true}
            />
            <div
              className="flex justify-center items-center gap-2 cursor-pointer border-[1px] rounded-lg border-black dark:border-neutral-400 p-2 w-full h-10 dark:text-neutral-400"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              Advanced
              {showAdvanced ? (
                <ChevronUpIcon className="w-6 h-6" />
              ) : (
                <ChevronDownIcon className="w-6 h-6" />
              )}
            </div>
            <WeightInput
              setState={(value) => handleFormChange("weight", value)}
            />
            {showAdvanced && (
              <>
                <FormInput
                  type="text"
                  title="domain"
                  placeholder="Domain"
                  text={post?.domain}
                  maxLength={30}
                  setState={(value) => handleFormChange("domain", value)}
                  isRequierd={false}
                  displayDefaultValue={true}
                />
                <FormInput
                  type="text"
                  title="altitude"
                  placeholder="Altitude"
                  text={post?.altitude}
                  maxLength={30}
                  setState={(value) => handleFormChange("altitude", value)}
                  isRequierd={false}
                  displayDefaultValue={true}
                />
                <FormInput
                  type="text"
                  title="process"
                  placeholder="Process"
                  text={post?.process}
                  maxLength={30}
                  setState={(value) => handleFormChange("process", value)}
                  isRequierd={false}
                  displayDefaultValue={true}
                />
                <FormInput
                  type="text"
                  title="type"
                  placeholder={"Type"}
                  text={post?.type}
                  maxLength={30}
                  setState={(value) => handleFormChange("type", value)}
                  isRequierd={false}
                  displayDefaultValue={true}
                />
                <FormInput
                  type="text"
                  title="Price"
                  placeholder={post?.price || "Price"}
                  maxLength={5}
                  setState={(value) => handleFormChange("price", value)}
                  isRequierd={false}
                  displayDefaultValue={true}
                />
              </>
            )}
          </div>
          <div className="w-full max-w-3xl mx-5 h-full  flex flex-col items-center justify-center border-[1px] rounded-lg border-black dark:border-neutral-400 p-2">
            {/* if there is an image to show, show the image */}
            {imageUrlBuffer ? (
              <div className="flex flex-col items-center justify-center">
                <img
                  src={imageUrlBuffer}
                  alt="image"
                  className="h-80 lg:h-[480px] w-full rounded-[7px]"
                />
                <div className="w-full border-b-[1px] border-black dark:border-neutral-400 pb-2" />
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    UpdateImage(res[0].url, res[0].key);
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                  className="cursor-pointer dark:text-neutral-400 pb-2"
                />
                <TrashIcon
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => {
                    UpdateImage("", imageKeyBuffer);
                    handleFormChange("imageUrl", "");
                    setImageUrlBuffer(""); // just to display th image and remove the image from the page not from the post
                  }}
                />
              </div>
            ) : (
              <div className="h-96 flex justify-center">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    UpdateImage(res[0].url, res[0].key);
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                  className="cursor-pointer w-full h-full flex justify-center items-center  dark:text-neutral-400"
                />
              </div>
            )}
          </div>
          <div className=" md:flex md:flex-row grid grid-cols-2 justify-around w-full md:w-1/2 items-center gap-10">
            <div className="flex justify-between items-center">
              <HearthInput
                rate={rate}
                setState={(value) => handleFormChange("rate", value)}
              />
            </div>
            <div className="flex justify-center items-center flex-col">
              <div className="text-sm text-slate-400">
                {form.status ? "Public" : "Private"}
              </div>
              <label className="relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={status}
                />
                <div
                  className="ring-0 bg-orange-500 rounded-full outline-none duration-1000 after:duration-300 w-16 h-8
									peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute after:bg-black after:outline-none after:h-6 after:w-6 after:top-1 after:left-1   
									peer-checked:after:translate-x-8 peer-hover:after:scale-95"
                  onClick={() => {
                    handleFormChange("status", !status);
                    setStatus(!status);
                  }}
                ></div>
              </label>
            </div>
            {/* </div> */}
          </div>
          <div className="flex justify-center pt-10 gap-10">
            <button
              className="px-5 md:px-10 lg:px-24 py-2 md:py-3 lg:py-4 border-[1px] text-sm md:text-base lg:text-lg border-black dark:border-neutral-400 rounded-full"
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 md:px-10 lg:px-24 py-2 md:py-3 lg:py-4 bg-orange-500 text-black text-sm md:text-base lg:text-lg rounded-full"
              disabled={submitting || false}
              onClick={() => handleFormSubmit(ModalAction.UPDATE)}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
        <div
          className="border-[1px] border-black dark:border-white px-3 py-2 rounded-lg flex justify-end items-end w-fit"
          onClick={() => {
            setSubmitType(ModalAction.DELETE);
            handleFormSubmit(ModalAction.DELETE);
          }}
        >
          Delete post
        </div>
      </div>
    </form>
  );
};

export default UpdateCardForm;
