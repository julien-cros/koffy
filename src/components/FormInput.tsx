"use client";

import React from "react";

type Props = {
  type?: string;
  title: string;
  placeholder: string;
  textArea?: boolean;
  setState: (value: string) => void;
  maxLength: number;
  isRequierd?: boolean;
};

const FormInput = ({ type, title, placeholder, textArea, setState, maxLength, isRequierd }: Props) => {
  return (
    <div className="flex flex-start flex-col gap-4">
      <label className="w-full text-gray-400">{title}</label>

      {textArea ? (
        <textarea
          className="relative w-full cursor-default rounded-lg bg-slate-100 
		  text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 
		focus-visible:ring-offset-2 focus-visible:ring-slate-400 sm:text-sm pl-4 pt-4"
          placeholder={placeholder}
          onChange={(e) => setState(e.target.value)}
		  maxLength={maxLength}
        />
      ) : (
        <input
          className="relative w-full cursor-default overflow-hidden rounded-lg bg-slate-100 
		  text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 
		focus-visible:ring-offset-2 focus-visible:ring-offset-slate-400 sm:text-sm p-4"
          type={type || "text"}
          placeholder={placeholder}
          onChange={(e) => setState(e.target.value)}
		  maxLength={maxLength}
		  required={isRequierd}
        />
      )}
    </div>
  );
};

export default FormInput;
