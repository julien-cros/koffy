"use server"

import React, { useState } from "react";
import FormInput from "./FormInput";
import { redirect, useRouter } from "next/navigation";
import HearthInput from "./HearthInput";
import { SessionInterface} from "@/lib/session";
import submit from "@/app/create-card/actions";
import { signIn } from "next-auth/react";

type Props = {
  type: string;
  session: SessionInterface;
};

export type PostInterface = {
  id: string;
  title: string;
  brand: string;
  variety: string;
  tasting: string;
  rate: number;
  note: string;
  price: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export type FormState = {
  title: string;
  brand: string;
  variety: string;
  tasting: string;
  rate: number;
  note: string;
  price: string;
};

const FormPage =  ({ type, session }: Props) => {
  let submitting = false;
  const form: FormState = {
    title: "",
    brand: "",
    variety: "",
    tasting: "",
    rate: 1,
    note: "",
    price: "",
  };

  if (!session?.user){
	alert("You must be logged in to view this page");
	() => {signIn()}
  }

  const handleStateChange = (
    fieldName: keyof FormState,
    value: string | number,
  ) => {
	form[fieldName] = value as never;
  };

  const handleFormSubmit = async () => {
    submitting = !submitting;

	try {
    	if (await submit(form, type))
		{redirect("/coffee-list")}
	} catch (error) {
		console.error(error);
		alert(
			`Failed to ${
				type === "create" ? "create" : "edit"
			} a project. Try again!`
		);
	}
	}


    // const { token } = await fetchToken()
    // console.log("token: ",token)

    // try {
    //   if (type === "create") {
    //     await CreatePost(form, session);

    //     // router.push("/")
    //   }

    //   if (type === "edit") {
    //     // await updateProject(form, post?.id as string, token)

    //     router.push("/");
    //   }
    // } catch (error) {
    //   console.error(error);

    //   alert(
    //     `Failed to ${
    //       type === "create" ? "create" : "edit"
    //     } a project. Try again!`
    //   );

  return (
    <form
      action={handleFormSubmit}
    //   onSubmit={handleFormSubmit}
    >
      <div className="flex justify-start flex-col pt-32 pl-10 gap-10">
        <FormInput
          type="text"
          title="Title"
          placeholder="Buside"
          setState={(value) => handleStateChange("title", value)}
        />
        <FormInput
          type="text"
          title="Brand"
          placeholder="Noir"
          setState={(value) => handleStateChange("brand", value)}
        />
        <FormInput
          type="text"
          title="Variety"
          placeholder="Arabica"
          setState={(value) => handleStateChange("variety", value)}
        />
        <FormInput
          type="text"
          title="Tasting"
          placeholder="Comment Your Taste"
          textArea
          setState={(value) => handleStateChange("tasting", value)}
        />
        <FormInput
          type="text"
          title="Note"
          placeholder="Note"
          textArea
          setState={(value) => handleStateChange("note", value)}
        />

        <FormInput
          type="text"
          title="Price"
          placeholder="Price"
          setState={(value) => handleStateChange("price", value)}
        />
        <HearthInput setState={(value) => handleStateChange("rate", value)} />

        <div className="flex  justify-center pt-10">
          <button
			type="submit"
            className="px-32 py-4 bg-amber-800 text-pale-red text-lg rounded-full"
            disabled={submitting || false}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormPage;
