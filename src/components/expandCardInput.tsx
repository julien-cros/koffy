"use client";

import React from "react";

type Props = {
  text?: string | null;
  title?: string | null;
  style?: string | null;
};

const ExpandCardInput = ({ text, title, style }: Props) => {
  return (
    <>
      {text && (
        <div
          className={`${style}
				font-light md:text-md lg:text-lg text-clip text-sm`}
        >
          <p className="text-neutral-600">{title}</p>
          <p>{text}</p>
        </div>
      )}
    </>
  );
};

export default ExpandCardInput;
