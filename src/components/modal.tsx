"use client";

import { useRouter } from "next/navigation";
import type React from "react";
import { type ReactNode, useCallback, useRef } from "react";
import Image from "next/image";

const Modal = ({ children }: { children: ReactNode }) => {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.push("/coffee-list");
  }, [router]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlay.current) {
        onDismiss();
      }
    },
    [onDismiss, overlay],
  );
  return (
    <div
      ref={overlay}
      className="fixed flex justify-center z-40 left-0 right-0 top-0 bottom-0 mx-auto bg-black/80"
      onClick={handleClick}
    >
      <button
        type="button"
        onClick={onDismiss}
        className="absolute top-4 right-8"
      >
        <Image src="/close.svg" width={17} height={17} alt="close modal" />
      </button>
      <div
        ref={wrapper}
        className="absolute h-[90%] w-full lg:w-[75%] justify-center bottom-0 bg-white 
					rounded-t-[30px] px-8 pt-14 pb-72 overflow-auto
					 whitespace-nowrap scrollbar-hide"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
