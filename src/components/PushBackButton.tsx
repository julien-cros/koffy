"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

const PushBackButton = () => {
	const router = useRouter();

	return (
		<button onClick={() => router.back()}>
			<ArrowLeftIcon className="w-5 h-5 md:w-7 md:h-7 lg:w-10 lg:h-10 cursor-pointer hover:scale-105 transition duration-150 active:scale-95" />
		</button>
	);
};

export default PushBackButton;
