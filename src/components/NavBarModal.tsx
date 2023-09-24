"use client";

import { useRouter } from "next/navigation";
import React, { ReactNode, useCallback, useRef } from "react";

const Modal = ({ children }: { children: ReactNode }) => {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.push("/");
  }, [router]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === overlay.current && onDismiss) {
        onDismiss();
      }
    },
    [onDismiss, overlay],
  );
  return (
    <div
      ref={overlay}
      className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60"
      onClick={(e) => handleClick(e)}
    >
      <div
        ref={wrapper}
        className="absolute h-full w-full md:w-[40%] xl:w-[30%] bottom-0 bg-white 
					rounded-tr-3xl pb-72 overflow-auto
					 whitespace-nowrap scrollbar-hide"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
