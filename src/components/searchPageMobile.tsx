"use client";

import React, { useCallback, useEffect } from "react";
import { useRef } from "react";
import { RightSide } from "./rightSide";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { SessionInterface } from "@/app/types/types";

type Popup = {
  // togglePopup: (event: React.MouseEvent<HTMLElement>) => void;
  setSearchPageOpen: (value: boolean) => void;
  onDismiss?: () => Promise<void>;
  session: SessionInterface | null | undefined;
};
export default function SearchPageMobile({
  session,
  setSearchPageOpen,
  onDismiss,
}: Popup) {
  const overlay = useRef<HTMLDivElement>(null);

  const onDismissInternal = useCallback(async () => {
    await onDismiss?.();
    setSearchPageOpen(false);
  }, [onDismiss]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlay.current) {
        onDismissInternal();
      }
    },
    [onDismiss, overlay],
  );

  useEffect(() => {
    onkeydown = (e) => {
      if (e.key === "Escape") {
        onDismissInternal();
      }
    };
  }, [onDismissInternal]);

  return (
    <div
      className="fixed inset-0 w-full h-full bg-white/50 dark:bg-black/50 backdrop-blur-sm z-50 flex flex-col"
      ref={overlay}
      onClick={handleClick}
    >
      <div className="flex justify-end p-4">
        <button onClick={onDismissInternal} className="px-4 py-2">
          <XMarkIcon className="h-7 w-7" />
        </button>
      </div>
      <div className="flex justify-center items-center h-full mx-10">
        <RightSide isSearchPage={true} session={session} />
      </div>
    </div>
  );
}
