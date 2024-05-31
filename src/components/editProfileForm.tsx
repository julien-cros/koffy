"use client";

import { ProfileInterface } from "@/app/types/types";
import { CheckIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { generateUploadButton } from "@uploadthing/react";
import { deleteImage } from "@/app/create-card/actions";
import FormInput from "./formInput";
import { deleteUser, getUserByName } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import Loader from "./loader";
import { Session } from "inspector";

type Props = {
  profile: ProfileInterface;
};

enum ModalAction {
  UPDATE = "update",
  DELETE = "delete",
}

export const UploadButton = generateUploadButton<OurFileRouter>();

export function EditProfileForm({ profile }: Props) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [nameBuffer, setNameBuffer] = useState(profile.user.name);
  const [isValidName, setIsValidName] = useState(true);
  const [submitType, setSubmitType] = useState(ModalAction.UPDATE);
  const [imageUrlBuffer, setImageUrlBuffer] = useState(profile.user?.avatar);
  const [imageKeyBuffer, setImageKeyBuffer] = useState(
    profile.user?.avatarKey || ""
  );
  const [form, setForm] = useState({
    name: profile.user.name,
    avatar: profile.user?.avatar || "",
    avatarKey: profile.user?.avatarKey || "",
    bio: profile?.bio || "",
    location: profile?.location || "",
  });

  // debounce
  const [isSearchingName, setIsSearchingName] = useState(false);
  const [searchName, setSearchName] = useState("");
  const debouncedSearchName = useDebounce(searchName, 300);

  const handleChange = (e: any) => {
    setSearchName(e.target.value);
  };

  const handleFormChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
    console.log("value", value);
  };

  const handleFormSubmit = async (submitType: string) => {
    if (!isValidName) {
      alert("Please enter a valid name");
      return;
    }
    if (
      debouncedSearchName.length > 1 &&
      isValidName &&
      debouncedSearchName.match(/^[0-9a-z]+$/i)
    ) {
      handleFormChange("name", debouncedSearchName);
    }
    setSubmitting(true);
    if (submitType === ModalAction.UPDATE) {
      // update
      // await updateProfile(data);
      // redirect(`/profile/${form.name}`);
    } else if (submitType === ModalAction.DELETE) {
      if (confirm("Are you sure you want to delete your account?")) {
        // delete
        await deleteUser(profile.user.id);
        router.push("/");
      } else {
        setSubmitting(false);
        return;
      }
    }
    setSubmitting(false);
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

  useEffect(() => {
    const fetchUser = async () => {
      if (debouncedSearchName) {
        setIsSearchingName(true);
        if (
          (searchName.length <= 1 && searchName) ||
          (!searchName.match(/^[0-9a-z]+$/i) && searchName)
        ) {
          setIsValidName(false);
          setIsSearchingName(false);
          return;
        }
        const res = await getUserByName(debouncedSearchName);
        if (res.length > 0) {
          setIsValidName(false);
        } else {
          setIsValidName(true);
        }
      }
      setIsSearchingName(false);
    };

    fetchUser();
  });
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
        <h3 className="flex justify-center text-2xl md:text-3xl text-black dark:text-white font-light text-center pb-10">
          Update your Profile
        </h3>
        <div className="w-full h-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 pb-32 md:pb-20 gap-5">
          <div className="flex justify-center">
            <div className="w-full max-h-80 max-w-sm px-5 flex flex-col items-center justify-center border-[1px] rounded-lg border-black dark:border-neutral-400 p-2">
              {/* if there is an image to show, show the image */}
              {imageUrlBuffer ? (
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={imageUrlBuffer}
                    alt="image"
                    className="h-24 lg:h-32 w-fit rounded-full"
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
          </div>
          <div>
            <label
              className={`w-full flex flex-row gap-2 ${
                isValidName
                  ? "text-gray-500 dark:text-gray-400"
                  : "text-red-400"
              }`}
            >
              {isValidName ? "Name*" : "Name* - Invalid name"}
              {debouncedSearchName && (
                <CheckIcon
                  className={`w-5 h-5 text-green-400 ${
                    isValidName ? "block" : "hidden"
                  }`}
                />
              )}
            </label>
            <input
              type="text"
              defaultValue={form.name}
              name="serachName"
              required
              placeholder={form.name || "Name"}
              onChange={handleChange}
              className={`w-full border-[1px]  bg-transparent rounded-lg p-2 ring-0 focus:outline-none text-sm dark:text-white ${
                isValidName
                  ? "border-black dark:border-neutral-400"
                  : "border-red-400"
              }`}
            />
            <FormInput
              type="text"
              title="Location"
              placeholder="Location"
              text={form.location}
              maxLength={30}
              isRequierd={false}
              displayDefaultValue={true}
              setState={() => handleFormChange("location", form.location)}
            />
            <FormInput
              type="text"
              title="Bio"
              placeholder="Bio"
              textArea={true}
              text={form.bio}
              maxLength={150}
              isRequierd={false}
              displayDefaultValue={true}
              setState={() => handleFormChange("bio", form.bio)}
            />
          </div>
        </div>
        <div className="absolute bottom-28 md:bottom-10 left-0 w-full flex justify-center gap-10">
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
        <div
          className="absolute bottom-10 left-5 border-[1px] border-black dark:border-white px-3 py-2 rounded-lg flex justify-end items-end w-fit cursor-pointer"
          onClick={() => {
            setSubmitType(ModalAction.DELETE);
            handleFormSubmit(ModalAction.DELETE);
          }}
        >
          <p className="text-sm md:text-base">Delete account</p>
        </div>
      </div>
    </form>
  );
}
