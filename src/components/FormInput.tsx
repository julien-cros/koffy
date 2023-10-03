"use client";

import React from "react";

type Props = {
  type?: string;
  title: string;
  placeholder: string;
  textArea?: boolean;
  setState: (value: string) => void;
  maxLength: number;
};

const FormInput = ({ type, title, placeholder, textArea, setState, maxLength }: Props) => {
  return (
    <div className="flex flex-start flex-col w-full gap-4">
      <label className="w-full text-gray-400">{title}</label>

      {textArea ? (
        <textarea
          className="w-full h-20 bg-gray-200 rounded-xl p-4"
          placeholder={placeholder}
          onChange={(e) => setState(e.target.value)}
		  maxLength={maxLength}
        />
      ) : (
        <input
          className="w-full h-12 bg-gray-200 rounded-xl p-4"
          type={type || "text"}
          placeholder={placeholder}
          onChange={(e) => setState(e.target.value)}
		  maxLength={maxLength}
        />
      )}
    </div>
  );
};

export default FormInput;
