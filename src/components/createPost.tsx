"use client";

import { OurFileRouter } from "@/app/api/uploadthing/core";
import { generateUploadButton } from "@uploadthing/react";
import { FormState, SessionInterface } from "@/app/types/types";
import { TrashIcon } from "@heroicons/react/24/outline";
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

export default function CreatePost({ type, session }: Props) {
  const submitType = type; // can be create or edit delete (for the delete of the image: edit)
  const [status, setStatus] = useState(false);
  const [rate, setRate] = useState<number>(1);
  const [submitting, setSubmitting] = useState(false);
  const [imageKeyBuffer, setImageKeyBuffer] = useState<string>("");
  const router = useRouter();

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
      if (form.imageKey) {
        await deleteImage(imageKeyBuffer);
        handleFormChange("imageKey", "");
        handleFormChange("imageUrl", "");
      }
      return;
    } else {
      // create sandwich alert (something went wrong)
      return;
    }
  };

  return (
    <form
      action={() => handleFormSubmit(submitType)}
      onSubmit={() => {
        handleFormSubmit(submitType);
      }}
    >
      <div className="p-10 gap-10">
        <div className="flex justify-start flex-col pt-24 px-10 gap-10">
          {/* all inputs to fill the form */}
          <FormInput
            type="text"
            title="Title"
            placeholder="Buside"
            maxLength={30}
            setState={(value) => handleFormChange("title", value)}
            isRequierd={true}
          />
          <FormInput
            type="text"
            title="Brand"
            placeholder="Noir"
            maxLength={30}
            setState={(value) => handleFormChange("brand", value)}
            isRequierd={true}
          />
          <FormInput
            type="text"
            title="Variety"
            placeholder="Arabica"
            maxLength={30}
            setState={(value) => handleFormChange("variety", value)}
            isRequierd={true}
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
            placeholder="Note"
            textArea
            maxLength={400}
            setState={(value) => handleFormChange("note", value)}
            isRequierd={false}
          />
          <div className="flex ">
            <FormInput
              type="text"
              title="Price"
              placeholder="Price"
              maxLength={5}
              setState={(value) => handleFormChange("price", value)}
              isRequierd={false}
            />

            {/* if there is an image to show, show the image */}
            {form.imageUrl ? (
              <div className="flex flex-col items-center justify-center">
                <img
                  src={form.imageUrl}
                  alt="image"
                  className="h-80 lg:h-[480px] w-full rounded-2xl"
                />
                <div className="w-3/4 border-b-[1px] border-black dark:border-white p-2" />
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
                  className="cursor-pointer"
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
                className="cursor-pointer"
              />
            )}
          </div>
          <WeightInput
            setState={(value) => handleFormChange("weight", value)}
          />
        </div>
        <div className="flex justify-between items-center">
          <HearthInput
            rate={rate}
            setState={(value) => handleFormChange("rate", value)}
          />
          <div>
            <div className=" text-center text-sm text-slate-400">
              {form.status ? "Public" : "Private"}
            </div>
            <label className="relative items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div
                className="ring-0 bg-orange-500 rounded-full outline-none duration-1000 after:duration-300 w-16 h-8
											peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute after:bg-black after:outline-none after:h-6 after:w-6 after:top-1 after:left-1   
											peer-checked:after:translate-x-8 peer-hover:after:scale-95"
                onClick={() => {
                  setStatus(!status);
                  handleFormChange("status", status);
                }}
              ></div>
            </label>
          </div>
        </div>
        <div className="flex justify-center pt-10">
          <button
            type="submit"
            className="px-32 py-4 bg-orange-500 text-black text-lg rounded-full"
            disabled={submitting || false}
            onClick={() => handleFormSubmit("create")}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
}
