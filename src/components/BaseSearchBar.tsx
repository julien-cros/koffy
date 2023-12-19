"use Client";

import { SessionInterface } from "@/lib/session";

type Props = {
  session: SessionInterface | null;
  setSearch: (search: string) => void;
};

const BaseSearchBar = ({ session, setSearch }: Props) => {
  void session;

  return (
    <div className="w-76 flex justify-center">
      <input
        type="text"
        placeholder="Search..."
        className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none sm:text-sm"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default BaseSearchBar;
