"use client";

import FormInput from "./FormInput";
import HearthInput from "./HearthInput";
import { SessionInterface } from "@/lib/session";
import submit, { findValidPost } from "@/app/create-card/actions";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  type: string;
  session: SessionInterface;
};

export type FormState = {
  title: string;
  brand: string;
  variety: string | null;
  tasting: string | null;
  rate: number | null;
  note: string | null;
  price: string | null;
};

const FormPage = ({ type, session }: Props) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [rate, setRate] = useState<number>(1);
  const [form] = useState({
    title: "",
    brand: "",
    variety: "",
    tasting: "",
    rate: 1,
    note: "",
    price: "",
  });

  if (!session?.user) {
    alert("You must be logged in to view this page");
    () => {
      signIn("google");
    };
  }

  const submitRate = (rate: number) => {
    setRate(rate);
    handleStateChange("rate", rate);
  };

  const handleStateChange = (
    fieldName: keyof FormState,
    value: string | number,
  ) => {
    form[fieldName] = value as never;
  };

  const handleFormSubmit = async () => {
    setSubmitting(true);
    const valid = await findValidPost(
      session.user.id,
      form.brand,
      form.variety,
    );
    if (valid) {
      alert("You already tasted this coffee!");
      setSubmitting(false);
    } else {
      const posts = await submit(form);
      if (posts) {
        router.push("/coffee-list");
      } else {
        alert(
          `Failed to ${
            type === "create" ? "create" : "edit"
          } a project. Try again!`,
        );
        setSubmitting(false);
      }
    }
  };

  return (
    <form
      action={handleFormSubmit}
      onSubmit={() => {
        handleFormSubmit();
      }}
    >
      <div className="flex justify-start flex-col pt-32 pl-10 gap-10">
        <FormInput
          type="text"
          title="Title"
          placeholder="Buside"
		  maxLength={30}
          setState={(value) => handleStateChange("title", value)}
        />
        <FormInput
          type="text"
          title="Brand"
          placeholder="Noir"
		  maxLength={30}
          setState={(value) => handleStateChange("brand", value)}
        />
        <FormInput
          type="text"
          title="Variety"
          placeholder="Arabica"
		  maxLength={30}
          setState={(value) => handleStateChange("variety", value)}
        />
        <FormInput
          type="text"
          title="Tasting"
          placeholder="Comment Your Taste"
          textArea
		  maxLength={400}
          setState={(value) => handleStateChange("tasting", value)}
        />
        <FormInput
          type="text"
          title="Note"
          placeholder="Note"
          textArea
		  maxLength={400}
          setState={(value) => handleStateChange("note", value)}
        />

        <FormInput
          type="text"
          title="Price"
          placeholder="Price"
		  maxLength={3}
          setState={(value) => handleStateChange("price", value)}
        />
        <HearthInput rate={rate} setRate={submitRate} />

        <div className="flex  justify-center pt-10">
          <button
            type="submit"
            className="px-32 py-4 bg-amber-800 text-pale-red text-lg rounded-full"
            disabled={submitting || false}
            onClick={handleFormSubmit}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormPage;
