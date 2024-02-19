"use client";

import FormInput from "./FormInput";
import HearthInput from "./HearthInput";
import WeightInput from "./WeightInput";
import { SessionInterface } from "@/lib/session";
import submit, { findValidPost } from "@/app/create-card/actions";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";
import ColorInput from "./ColorInput";

type AlertBoxProps = {
  message: string;
  icon: any;
  messageButton?: string;
};

type Props = {
  type: string;
  session: SessionInterface;
};

export type FormState = {
  title: string;
  brand: string;
  variety: string;
  tasting: string | null;
  rate: number;
  note: string | null;
  price: string | null;
  weight: string | null;
  status: boolean;
  color: string | null;
};

const FormPage = ({ type, session }: Props) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [rate, setRate] = useState<number>(1);
  const [status, setStatus] = useState<boolean>(true);
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
    color: "bg-pale-red",
  });

  const AlertBox = ({ message, icon, messageButton }: AlertBoxProps) => {
    Swal.fire({
      icon: icon,
      title: message,
      showCloseButton: true,
      timer: 10000,
      timerProgressBar: true,
      showConfirmButton: true,
      confirmButtonColor: "#c2410c",
      confirmButtonText: messageButton,
    }).then((result) => {
      if (result.isConfirmed) {
        signIn("google");
      } else {
        <Link href="/" />;
      }
    });
  };

  function isAlphanumeric(str: string) {
    return (
      str.match(/(^[A-Za-z0-9- .@$#%&.,<>"';:!?()/]*$|[à-ü]|[À-Ü]|^$)/) !== null
    );
  }

  useEffect(() => {
    if (!session?.user) {
      AlertBox({
        message: "You need to sign in to create a new post!",
        icon: "warning",
        messageButton: "Sign In",
      });
      () => {
        signIn("google");
      };
    }
  });

  const submitRate = (rate: number) => {
    setRate(rate);
    handleStateChange("rate", rate);
  };

  const handleStateChange = (
    fieldName: keyof FormState,
    value: string | number | boolean,
  ) => {
    form[fieldName] = value as never;
  };

  const handleFormSubmit = async () => {
    setSubmitting(true);
    const valid = await findValidPost(
      session?.user.id,
      form.brand,
      form.title,
    );
    if (valid) {
      AlertBox({
        message: "You already tasted this coffee!",
        icon: "warning",
        messageButton: "go it!",
      });
      setSubmitting(false);
    } else if (form.title === "" || form.title === null) {
      AlertBox({
        message: "Title is required!",
        icon: "warning",
        messageButton: "go it!",
      });
      setSubmitting(false);
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
        icon: "warning",
        messageButton: "go it!",
      });
      setSubmitting(false);
    } else {
      const posts = await submit(form);
      if (posts) {
        setSubmitting(false);
        router.push("/coffee-list");
      } else {
        AlertBox({
          message: `Failed to
			${type === "create" ? "create" : "edit"} a project. Try again!`,
          icon: "error",
          messageButton: "ok",
        });
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
      <div className="flex justify-start flex-col pt-24 px-10 gap-10">
        <FormInput
          type="text"
          title="Title"
          placeholder="Buside"
          maxLength={30}
          setState={(value) => handleStateChange("title", value)}
          isRequierd={true}
        />
        <FormInput
          type="text"
          title="Brand"
          placeholder="Noir"
          maxLength={30}
          setState={(value) => handleStateChange("brand", value)}
          isRequierd={true}
        />
        <FormInput
          type="text"
          title="Variety"
          placeholder="Arabica"
          maxLength={30}
          setState={(value) => handleStateChange("variety", value)}
          isRequierd={true}
        />
        <FormInput
          type="text"
          title="Tasting"
          placeholder="Comment Your Taste"
          textArea
          maxLength={400}
          setState={(value) => handleStateChange("tasting", value)}
          isRequierd={false}
        />
        <FormInput
          type="text"
          title="Note"
          placeholder="Note"
          textArea
          maxLength={400}
          setState={(value) => handleStateChange("note", value)}
          isRequierd={false}
        />

        <div className="flex ">
          <FormInput
            type="text"
            title="Price"
            placeholder="Price"
            maxLength={5}
            setState={(value) => handleStateChange("price", value)}
            isRequierd={false}
          />
          <WeightInput
            isUpdate={false}
            setState={(value) => handleStateChange("weight", value)}
          />
        </div>
        <div className="flex justify-between items-center">
          <HearthInput rate={rate} setRate={submitRate} />
          <div>
            <div className=" text-center text-sm text-slate-400">
              {form.status ? "Public" : "Private"}
            </div>
            <label className="relative items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div
                className="ring-0 bg-slate-200 rounded-full outline-none duration-1000 after:duration-300 w-16 h-8  shadow-md  
							peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute after:bg-slate-400 after:outline-none after:h-6 after:w-6 after:top-1 after:left-1   
							peer-checked:after:translate-x-8 peer-hover:after:scale-95 peer-checked:bg-emerald-400 "
                onClick={() => {
                  setStatus(!status);
                  handleStateChange("status", status);
                }}
              ></div>
            </label>
          </div>
        </div>
        <div className="flex items-center">
          <ColorInput
            color={form.color}
            setState={(value) => handleStateChange("color", value)}
          />
        </div>
        <div className="flex justify-center pt-10">
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
