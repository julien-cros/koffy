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
          className="ml-2 mt-1 w-full h-[75px] bg-slate-100 pl-2 shadow-md placeholder-gray-400 text-sm rounded-lg px-5 py-2 outline-none"
          placeholder={text ? text : placeholder}
          onChange={(e) => setChange(type, e.target.value)}
		  maxLength={maxLength}
        />
      ) : (
        <input
          disabled={!submitting}
          className="w-[100px] h-[50px] bg-slate-100 pl-2 placeholder-gray-400 text-sm shadow-md rounded-lg px-5 py-2 outline-none"
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
