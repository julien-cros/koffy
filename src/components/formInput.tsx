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
  displayDefaultValue?: boolean;
  text?: string | null;
};

const FormInput = ({
  type,
  title,
  placeholder,
  textArea,
  setState,
  maxLength,
  isRequierd,
  displayDefaultValue,
  text,
}: Props) => {
  return (
    <div className="flex flex-start flex-col gap-1 w-full">
      <label className="w-full text-gray-500 dark:text-gray-400">
        {title}
        {isRequierd ? "*" : ""}
      </label>

      {textArea ? (
        <textarea
          defaultValue={text && displayDefaultValue ? text : ""}
          className="relative w-full min-h-fit h-24 cursor-default  rounded-lg lg:rounded-xl outline-none ring-0 border-[1px] border-black dark:border-neutral-400
						bg-transparent dark:text-white text-left focus:outline-none text-sm pl-2 pt-1 md:pt-4"
          placeholder={placeholder}
          onChange={(e) => setState(e.target.value)}
          maxLength={maxLength}
        />
      ) : (
        <input
          defaultValue={text && displayDefaultValue ? text : ""}
          className="relative w-full cursor-default overflow-hidden rounded-lg border-[1px] border-black dark:border-neutral-400
						bg-transparent dark:text-white outline-none pl-2 text-left text-sm p-1 md:p-2 h-10"
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
