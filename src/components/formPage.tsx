"use client";

import { OurFileRouter } from "@/app/api/uploadthing/core";
import { generateUploadButton } from "@uploadthing/react";
import { FormState, SessionInterface } from "@/app/types/types";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useRouter } from "next/navigation";
import WeightInput from "./weightInput";
import HearthInput from "./hearthInput";
import FormInput from "./formInput";
import submit, { deleteImage, findValidPost } from "@/app/create-card/actions";

type Props = {
  type: string;
  session: SessionInterface;
};

export const UploadButton = generateUploadButton<OurFileRouter>();

export default function FormPage({ type, session }: Props) {
  const submitType = type; // can be create or edit delete (for the delete of the image: edit)
  const [status, setStatus] = useState(false);
  const [rate, setRate] = useState<number>(1);
  const [submitting, setSubmitting] = useState(false);
  const [imageKeyBuffer, setImageKeyBuffer] = useState<string>("");
  const router = useRouter();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [form] = useState({
    title: "",
    brand: "",
    variety: "",
    tasting: "",
    rate: 1,
    note: "",
    price: "",
    weight: "150g",
    status: false,
    imageUrl: "",
    imageKey: "",
    country: "",
    domain: "",
    altitude: "",
    process: "",
    type: "",
  });

  // handle the changes of the form
  const handleFormChange = (
    key: keyof FormState,
    value: string | number | boolean
  ) => {
    form[key] = value as never;

    if (key === "rate") {
      setRate(value as number);
    }
  };

  // submit the form to the server to create, update or delete the post
  const handleFormSubmit = async (submitType: string) => {
    if (submitType === "create") {
      setSubmitting(true);
      const exists = await findValidPost(
        session?.user.id,
        form.brand,
        form.title
      );
      if (!exists && form.title && form.brand && form.variety) {
        const post = await submit(form);
        if (post) {
          return router.push(`/coffee-list/${post.id}`);
        }
        setSubmitting(false);
        return alert("Something went wrong");
      } else {
        if (exists) {
          alert("Post already exists");
        } else {
          alert("Fill the form correctly with Title, brand and variety");
        }
        setSubmitting(false);
        return;
      }
    } else if (submitType === "update") {
      // update the image of the post
      if (form.imageKey) {
        await deleteImage(form.imageKey);
      }
      if (imageKeyBuffer) {
        handleFormChange("imageKey", imageKeyBuffer);
      }
      return;
    } else if (submitType === "delete") {
      if (imageKeyBuffer) {
        console.log("delete");
        await deleteImage(imageKeyBuffer);
        setImageKeyBuffer("");
        handleFormChange("imageKey", "");
        handleFormChange("imageUrl", "");
      }
      return;
    } else {
      // create sandwich alert (something went wrong)
      return;
    }
  };

  const handleCancel = () => {
    if (imageKeyBuffer) deleteImage(imageKeyBuffer);
    router.back();
  };

  return (
    <form
      action={() => handleFormSubmit(submitType)}
      onSubmit={() => {
        handleFormSubmit(submitType);
      }}
    >
      <div className="h-full w-full pt-24 md:p-10">
        <XMarkIcon
          className="w-6 h-6 cursor-pointer absolute top-10 right-10"
          onClick={() => handleCancel()}
        />
        <h3 className="flex justify-center text-2xl md:text-3xl text-black dark:text-white font-light text-left max-w-5xl w-full">
          Create a new coffee post
        </h3>
        <div className="p-10 justify-between items-center flex flex-col gap-5 ">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-3xl mx-auto gap-4 gap-x-10">
            <FormInput
              type="text"
              title="Title"
              placeholder="Coffee Name"
              maxLength={30}
              setState={(value) => handleFormChange("title", value)}
              isRequierd={true}
            />
            <FormInput
              type="text"
              title="Brand"
              placeholder="Brand"
              maxLength={30}
              setState={(value) => handleFormChange("brand", value)}
              isRequierd={true}
            />
            <FormInput
              type="text"
              title="Variety"
              placeholder="Variety"
              maxLength={30}
              setState={(value) => handleFormChange("variety", value)}
              isRequierd={true}
            />
            <FormInput
              type="text"
              title="country"
              placeholder="Country"
              maxLength={30}
              setState={(value) => handleFormChange("country", value)}
              isRequierd={false}
            />
            <FormInput
              type="text"
              title="Tasting"
              placeholder="Comment Your Taste"
              textArea
              maxLength={400}
              setState={(value) => handleFormChange("tasting", value)}
              isRequierd={false}
            />
            <FormInput
              type="text"
              title="Note"
              placeholder="You can write a note here."
              textArea
              maxLength={400}
              setState={(value) => handleFormChange("note", value)}
              isRequierd={false}
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
                  maxLength={30}
                  setState={(value) => handleFormChange("domain", value)}
                  isRequierd={false}
                />
                <FormInput
                  type="text"
                  title="altitude"
                  placeholder="Altitude"
                  maxLength={30}
                  setState={(value) => handleFormChange("altitude", value)}
                  isRequierd={false}
                />
                <FormInput
                  type="text"
                  title="process"
                  placeholder="Process"
                  maxLength={30}
                  setState={(value) => handleFormChange("process", value)}
                  isRequierd={false}
                />
                <FormInput
                  type="text"
                  title="type"
                  placeholder="Type"
                  maxLength={30}
                  setState={(value) => handleFormChange("type", value)}
                  isRequierd={false}
                />
                <FormInput
                  type="text"
                  title="Price"
                  placeholder="Price"
                  maxLength={5}
                  setState={(value) => handleFormChange("price", value)}
                  isRequierd={false}
                />
              </>
            )}
          </div>
          <div className="w-full max-w-3xl mx-auto h-full flex flex-col items-center justify-center border-[1px] rounded-lg border-black dark:border-neutral-400 p-2">
            {/* if there is an image to show, show the image */}
            {form.imageUrl ? (
              <div className="flex flex-col items-center justify-center">
                <img
                  src={form.imageUrl}
                  alt="image"
                  className="h-80 lg:h-[480px] w-full rounded-[7px]"
                />
                <div className="w-full border-b-[1px] border-black dark:border-neutral-400 pb-2" />
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    handleFormChange("imageUrl", res[0].url);
                    setImageKeyBuffer(res[0].key);
                    handleFormSubmit("update");
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                  className="cursor-pointer dark:text-neutral-400 pb-2"
                />
                <TrashIcon
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => {
                    handleFormSubmit("delete");
                    handleFormChange("imageUrl", "");
                  }}
                />
              </div>
            ) : (
              <div className="h-96 flex justify-center">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    handleFormChange("imageUrl", res[0].url);
                    setImageKeyBuffer(res[0].key);
                    handleFormSubmit("update");
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
                <input type="checkbox" className="sr-only peer" />
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
          <div className="flex justify-center pt-10  gap-10">
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
              onClick={() => handleFormSubmit("create")}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
