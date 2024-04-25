"use client";

import React, { useState } from "react";

type Props = {
  status: boolean;
  setStatus: (type: boolean) => void;
};

const ButtonPrivatePublic = ({ setStatus, status }: Props) => {
  const [clicked, setClicked] = useState(status);

  return (
    <div className="w-20">
      <button
        className={`relative w-full cursor-default rounded-full py-2 text-center focus:outline-none sm:text-sm border-black border-[1px] dark:border-white`}
        onClick={() => {
          setClicked(!clicked);
          setStatus(!clicked);
        }}
      >
        {clicked ? "public" : "private"}
      </button>
    </div>
  );
};

export default ButtonPrivatePublic;
