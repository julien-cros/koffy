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

const FormInput = ({
  type,
  title,
  placeholder,
  textArea,
  setState,
  maxLength,
  isRequierd,
}: Props) => {
  return (
    <div className="flex flex-start flex-col gap-4">
      <label className="w-full text-gray-400">{title}</label>

      {textArea ? (
        <textarea
          className="relative w-full cursor-default outline-none ring-0 rounded-full border-[1px] border-black dark:border-white
						dark:bg-black dark:text-white text-left focus:outline-none text-sm pl-4 pt-2 md:pt-4 "
          placeholder={placeholder}
          onChange={(e) => setState(e.target.value)}
          maxLength={maxLength}
        />
      ) : (
        <input
          className="relative w-full cursor-default overflow-hidden rounded-full border-[1px] border-black dark:border-white
						dark:bg-black dark:text-white outline-none  text-left text-sm p-2 md:p-4"
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
