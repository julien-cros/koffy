"use client";

import FormInput from "./FormInput";
import HearthInput from "./HearthInput";
import WeightInput from "./WeightInput";
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
  weight: string | null;
  status: boolean;
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
  });

  function isAlphanumeric(str: string) {
	return str.match(/(^[A-Za-z0-9- .@$#%&.,<>"';:!?()/]*$|[à-ü]|[À-Ü]|^$)/) !== null;
  }

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
    value: string | number | boolean,
  ) => {
    form[fieldName] = value as never;
  };

  const handleFormSubmit = async () => {
    setSubmitting(true);
    const valid = await findValidPost(
      session?.user.id,
      form?.brand,
    );
    if (valid) {
      alert("You already tasted this coffee!");
      setSubmitting(false);
    } 
	else if (form.title === "" || form.title === null ) {
		alert("Title is required!");
		setSubmitting(false);
	}
	else if ( isAlphanumeric(form?.title) === false || isAlphanumeric(form?.brand) === false  
		|| isAlphanumeric(form?.variety) === false || isAlphanumeric(form?.tasting) === false 
		|| isAlphanumeric(form?.note) === false || isAlphanumeric(form?.weight) === false ) {
		alert("Only alphanumeric characters are allowed!");
		setSubmitting(false);
		}
	else {
      const posts = await submit(form);
      if (posts) {
		  setSubmitting(false);
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
		  isRequierd={false}
        />
        <FormInput
          type="text"
          title="Variety"
          placeholder="Arabica"
          maxLength={30}
          setState={(value) => handleStateChange("variety", value)}
		  isRequierd={false}
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
              <input
                type="checkbox"
                className="sr-only peer"
              />
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
