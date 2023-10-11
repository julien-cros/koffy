"use Client";

import { SessionInterface } from '@/lib/session';

type Props = {
	session: SessionInterface | null;
	setSearch: (search: string) => void;
  };

const BaseSearchBar = ({session, setSearch }: Props) => {
	void session;


  return (
	<div className='w-full h-full flex justify-center'>
		<input
            type="text"
            placeholder="Search..."
            className=" placeholder-gray-400 text-sm rounded-lg px-5 py-2 ring-1 outline-none ring-gray-200 hover:ring-gray-300 focus:ring-2 focus:ring-gray-400"
			onChange={(e) => setSearch(e.target.value)}
			
          />
	</div>
  )
}

export default BaseSearchBar;