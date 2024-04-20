"use client";

import { ArrowUpOnSquareIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type CopyBlipboardButtonProps = {
	cardId: string | null;
};

export default function CopyBlipboardButton({ cardId } : CopyBlipboardButtonProps) {
	
	
	const [clicked, setClicked] = useState(false);
	const handleClick = () => {
		navigator.clipboard.writeText(
			`${window.location.origin}` + `/coffee-list/${cardId}`
		);
	};
	return (
		<button
			onClick={() => {
				handleClick();
				setClicked(true);
				setTimeout(() => {
					setClicked(false);
				}, 1000);
			}}
			className="flex items-center justify-center "
		>
			{clicked ? (
				<CheckIcon className="h-6 w-6" />
			) : (
				<ArrowUpOnSquareIcon className="h-6 w-6" />
			)}
		</button>
	);
}