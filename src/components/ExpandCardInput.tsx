"use client";

import React from "react";

type Props = {
  placeholder: string;
  type: string;
  isTextArea: boolean;
  text: string | null | undefined;
  submitting: boolean;
  setChange: (type: string, value: string | number) => void;
};

const ExpandCardInput = ({
  placeholder,
  type,
  isTextArea,
  submitting,
  setChange,
  text,
}: Props) => {
  return (
    <div>
      {isTextArea ? (
        <textarea
          name={type}
          disabled={!submitting}
          className="ml-2 mt-1 w-2/3 h-[75px] bg-slate-300  shadow-[inset_0_0_5px_] shadow-slate-400 pl-2 placeholder-gray-400 text-sm rounded-lg px-5 py-2 ring-1 outline-none ring-gray-200 hover:ring-gray-300 focus:ring-2 focus:ring-gray-400"
          placeholder={text ? text : placeholder}
          onChange={(e) => setChange(type, e.target.value)}
        />
      ) : (
        <input
          disabled={!submitting}
          className="w-[50px] h-[30px] bg-slate-300 shadow-[inset_0_0_5px_] shadow-slate-400 pl-2 placeholder-gray-400 text-sm rounded-lg px-5 py-2 ring-1 outline-none ring-gray-200 hover:ring-gray-300 focus:ring-2 focus:ring-gray-400"
          placeholder={text ? text : placeholder}
          type={type}
          onChange={(e) => setChange(type, e.target.value)}
        />
      )}
    </div>
  );
};

export default ExpandCardInput;
