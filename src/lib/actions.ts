"use server";

import type { SessionInterface } from "@/app/types/types";
import { authOptions } from "@/lib/session";
import { db } from "./db";
import { checkUserByPost } from "@/app/create-card/actions";
import { getServerSession } from "next-auth";

const isProduction = process.env.NODE_ENV === "production";
const serverUrl = isProduction || "http://localhost:3000/api/auth/token";

export async function getCurrentUser() {
	const session = (await getServerSession(
		authOptions as any,
	)) as SessionInterface | null;

	return session;
}

export const getUserByName = async (name: string) => {
	const post = await db.user.findMany({
		where: {
			name,
		},
	});
	return post;
}

export const createUser = async (
	name: string,
	email: string,
	avatar: string,
) => {
	const user = await db.user.create({
		data: {
			name,
			email,
			avatar,
		},
	});
	return user;
};

export const getUser = async (email: string) => {
	const user = await db.user.findUnique({
		where: {
			email,
		},
	});
	return user;
};

export const fetchToken = async () => {
	try {
		const response = await fetch(`${serverUrl}/api/auth/token`);
		return response.json();
	} catch (err) {
		throw err;
	}
};

export const getPostFromId = async (id: string | null) => {
	if (!id) return null;
	const post = await db.posts.findUnique({
		include: {
			author: {
				select: {
					name: true,
					avatar: true,
				},
			},
		},
		where: {
			id,
		},
	});
	return post;
};

export const getUserPosts = async (authorId: string | undefined) => {
	if (!authorId) return null;
	try {
		const posts = await db.posts.findMany({
			include: {
				author: {
					select: {
						name: true,
						avatar: true,
					},
				},
			},
			where: {
				authorId,
			},
		});
		if (posts.length > 0) return posts;
		else return null;
	} catch (err) {
		throw err;
	}
};

export default async function findPosts(
	key: string,
	value: string | number,
	authorId: string,
) {
	const posts = await db.posts.findMany({
		where: {
			[key]: {
				contains: value,
				mode: "insensitive",
			},
			authorId: authorId,
		},
	});
	console.log("the post is equal to:", posts);
	if (posts.length > 0) {
		console.log(
			"Post already exists while searching by " + key + " and " + value,
		);
		return posts;
	} else return null;
}

export async function getUserFromId(id: string) {
	const user = await getCurrentUser();
	if (!user?.user.id) return null;
	const response = checkUserByPost(id, user.user.id);
	if (response) return response;
	else return null;
}

export async function DuplicatePost(id: string, user: SessionInterface) {
	if (!user?.user.id) {
		console.log("No user found");
		return null;
	}
	const post = await getPostFromId(id);
	if (!post) return null;

	if (post.authorId === user.user.id) {
		console.log("User is the author");
		return null;
	} else if (
		(await findPosts("title", post.title, user.user.id)) === null &&
		(await findPosts("brand", post.brand, user.user.id)) === null
	) {
		await db.posts.create({
			data: {
				title: post.title,
				brand: post.brand,
				variety: post.variety,
				tasting: post?.tasting,
				rate: post.rate,
				note: post?.note,
				price: post.price,
				status: post.status,
				imageUrl: post?.imageUrl,
				imageKey: post?.imageKey,
				country: post?.country,
				domain: post?.domain,
				altitude: post?.altitude,
				process: post?.process,
				type: post?.type,
				author: {
					connect: {
						id: user.user.id,
					},
				},
			},
		});
		return post;
	} else return null;
}

export async function getImageAndName(posts: any) {
	const creator = await db.user.findMany({
		where: {
			id: {
				in: posts.map((post: any) => post.authorId),
			},
		},
	});
	return creator;
}

//ici
export async function getPostForFeed(NumbOfPosts: number, PostOffset: number) {
	return db.posts.findMany({
		skip: PostOffset,
		take: NumbOfPosts,
		include: {
			author: {
				select: {
					name: true,
					avatar: true,
				},
			},
		},
		orderBy: {
			createdAt: "desc",
		},
		where: {
			status: true,
		},
	});
}

export async function getCreator(id: string) {
	const creator = await db.user.findUnique({
		where: {
			id,
		},
	});
	return creator;
}

export async function getProfile(user: string) {
	return await db.profile.findFirst({
		include: {
			user: {
				select: {
					id: true,
					name: true,
					avatar: true,
					avatarKey: true,
				},
			},
		},
		where: {
			user: {
				name: decodeURI(user),
			},
		},
	});
}

export async function deleteUser(id: string) {
	await db.profile.delete({
		where: {
			userId: id,
		},
	});
	await db.posts.deleteMany({
		where: {
			authorId: id,
		},
	});
	await db.user.delete({
		where: {
			id,
		},
	});
}

// export const getWishlist = async (authorId: string) => {
// 	const wishlist = await db.wishlist.findMany({
// 		where: {
// 			authorId,
// 		},
// 	});
// 	if (wishlist.length > 0) return wishlist;
// 	else return null;
// }

// export const createWishlist = async (form: WishLlistProps, user: SessionInterface) => {
// 	try {
// 		await db.wishlist.create({
// 			data: {
// 				title: form.title,
// 				brand: form.brand,
// 				price: form.price,
// 				url: form.url,
// 				author: {
// 					connect: {
// 						id: user.user.id,
// 					},
// 				}
// 			}
// 		})
// 		return true;
// 	} catch (err) {
// 		throw err;
// 	}
// }

// export const DelUpWishlist = async (type: string, form: WishLlistProps, id: string, user: SessionInterface) => {
// 	if (user) {
// 		if (type === "update") {
// 			try {
// 				await db.wishlist.update({
// 					where: {
// 						id,
// 						authorId: user?.user.id
// 					},
// 					data: {
// 						title: form?.title,
// 						brand: form?.brand,
// 						price: form?.price,
// 						url: form?.url
// 					}
// 				});
// 				return true;
// 			} catch (error) {
// 				return (null);
// 			}
// 		}
// 		else if (type === "delete") {
// 			try {
// 				await db.wishlist.delete({
// 					where: {
// 						id
// 					}
// 				})
// 				return true;
// 			} catch (error) {
// 				return false;
// 			}
// 		}
// 	}
// 	return false
// }

// await db.user.update({)
