"use Client";

import type { SessionInterface } from "@/app/types/types";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

type Props = {
  session: SessionInterface | null | undefined;
  setSearch: (search: string) => void;
  setClicked: (clicked: boolean) => void;
};

const BaseSearchBar = ({ session, setSearch, setClicked }: Props) => {
  void session;

  return (
    <div className="w-full flex flex-row justify-between cursor-default rounded-md py-1 pl-3 border-black dark:border-neutral-400  border-[1px]">
      <input
        type="text"
        placeholder="Search..."
        className="relative w-full text-left focus:outline-none bg-transparent"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "Return") setClicked(true);
        }}
      />
      <ChevronRightIcon
        className="w-6 h-6 text-black dark:text-neutral-400 cursor-pointer"
        onClick={() => setClicked(true)}
      />
    </div>
  );
};

export default BaseSearchBar;
