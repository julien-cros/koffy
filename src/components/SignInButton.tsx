// "use client"

// import React from 'react'
// import { signIn, signOut, useSession } from 'next-auth/react'
// import Image from 'next/image'
// import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'

// type SignInButtonProps = {
// 	bgColor?: string
// 	textColor?: string
// 	hoverBgColor?: string
// 	hoverTextColor?: string
// 	borderColor?: string
// 	border?: string

// }

// const SignInButton = ({ bgColor, textColor, hoverBgColor, hoverTextColor, borderColor, border }: SignInButtonProps) => {
// 	const { data: session } = useSession()

// 	if (session && session.user) {
// 		return (
// 			<div>
// 				{/* {session?.user?.image && (
//                         <Image
//                             src={session?.user?.image}
//                             width={40}
//                             height={40}
//                             className="rounded-full"
//                             alt="user profile image"
//                         />
//                     )} */}
// 				<button
// 					onClick={() => signOut()}
// 					className={`rounded-full text-md tracking-wide px-4 py-2
// 						${bgColor ? bgColor : 'bg-yellow-800'}
// 						${textColor ? textColor : 'text-white'}
// 						${hoverBgColor ? hoverBgColor : "hover:bg-yellow-800"}
// 						${hoverTextColor ? hoverTextColor : "hover:text-white"}
// 						${borderColor ? borderColor : "border-none"}
// 						${border ? border : "border-none"}
// 						hover:scale-105 transition duration-105 ease-out active:scale-95 shadow-lg active:shadow-xl`}

// 				>sign Out</button>
// 			</div>
// 		)
// 	}
//   return (
// 	<div>
// 		<button
// 			className={`flex items-center  rounded-full text-md tracking-wide px-4 py-2
// 				${bgColor ? bgColor : 'bg-yellow-800'}
// 				${textColor ? textColor : 'text-white'}
// 				${hoverBgColor ? hoverBgColor : "hover:bg-yellow-800"}
// 				${hoverTextColor ? hoverTextColor : "hover:text-white"}
// 				${borderColor ? borderColor : "border-none"}
// 				${border ? border : "border-none"}
// 				hover:scale-105 transition duration-105 ease-out active:scale-95 shadow-lg active:shadow-xl`}
// 			onClick={() => signIn()}>
// 			{/* <QuestionMarkCircleIcon className='flex  w-5 h-5'/> */}
// 			Sign In
// 		</button>
// 	</div>
//   )
// }

// export default SignInButton

// // bg-yellow-900 rounded-full text-md tracking-wide text-white px-4 py-2 hover:scale-105 transition duration-105 ease-out active:scale-95 shadow-lg active:shadow-xl
