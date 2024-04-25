"use client";

import React from "react";

type Props = {
  placeholder: string;
  type: string;
  isTextArea: boolean;
  text: string | null | undefined;
  submitting: boolean;
  setChange: (type: string, value: string | number) => void;
  maxLength: number;
  isRequierd: boolean;
};

const ExpandCardInput = ({
  placeholder,
  type,
  isTextArea,
  submitting,
  setChange,
  text,
  maxLength,
  isRequierd,
}: Props) => {
  return (
    <div>
      {isTextArea ? (
        <textarea
          name={type}
          disabled={!submitting}
          className="ml-2 mt-1 w-full h-[75px]  pl-2 border-[1px] border-black dark:border-white 
						text-sm rounded-lg px-5 py-2 outline-none dark:bg-black dark:text-white dark:placeholder-white"
          placeholder={text ? text : placeholder}
          onChange={(e) => setChange(type, e.target.value)}
          maxLength={maxLength}
        >
          {text}
        </textarea>
      ) : (
        <input
          defaultValue={text ? text : ""}
          disabled={!submitting}
          className="w-[130px] md:w-[200px] h-[50px] pl-4 text-xs md:text-sm border-[1px] border-black
						dark:border-white  rounded-full px-5 py-2 outline-none dark:bg-black dark:text-white dark:placeholder-white"
          placeholder={text ? text : placeholder}
          onChange={(e) => setChange(type, e.target.value)}
          maxLength={maxLength}
          required={isRequierd}
        />
      )}
    </div>
  );
};

export default ExpandCardInput;
