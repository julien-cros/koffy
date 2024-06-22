"use server"

import { getCurrentUser } from "@/lib/actions";
import { db } from "@/lib/db";

export async function findSearchPost(
	key: string,
	value: string | number,
	isPrivate: string,
) {
	const user = await getCurrentUser();
	if (isPrivate === "private" && !user) return [];
	if (key === "all")
		return findPostWithAllKeys(value, isPrivate, user?.user.id);
	if (isPrivate === "private") {
		return await db.posts.findMany({
			orderBy: {
				createdAt: "desc",
			},
			include: {
				author: {
					select: {
						name: true,
						avatar: true,
					},
				},
			},
			where: {
				[key]: {
					contains: value,
					mode: "insensitive",
				},
				authorId: user?.user.id,
			},
		});
	} else if (isPrivate === "public") {
		return await db.posts.findMany({
			include: {
				author: {
					select: {
						name: true,
						avatar: true,
					},
				},
			},
			where: {
				[key]: {
					contains: value,
					mode: "insensitive",
				},
				status: true,
			},
		});
	}
	return [];
}

export async function findSearchPostPacked(
	key: string,
	value: string | number,
	isPrivate: string,
	numOfPosts: number,
	offset: number,
) {
	const user = await getCurrentUser();
	if (isPrivate === "private" && !user) return [];
	if (key === "all")
		return findPostWithAllKeysPacked(value, isPrivate, user?.user.id, numOfPosts, offset);
	if (isPrivate === "private") {
		return await db.posts.findMany({
			skip: offset,
			take: numOfPosts,
			orderBy: {
				createdAt: "desc",
			},
			include: {
				author: {
					select: {
						name: true,
						avatar: true,
					},
				},
			},
			where: {
				[key]: {
					contains: value,
					mode: "insensitive",
				},
				authorId: user?.user.id,
			},
		});
	} else if (isPrivate === "public") {
		return await db.posts.findMany({
			skip: offset,
			take: numOfPosts,
			orderBy: {
				createdAt: "desc",
			},
			include: {
				author: {
					select: {
						name: true,
						avatar: true,
					},
				},
			},
			where: {
				[key]: {
					contains: value,
					mode: "insensitive",
				},
				status: true,
			},
		});
	}
	return [];
}

async function findPostWithAllKeysPacked(
	value: string | number,
	isPrivate: string,
	user: string | undefined,
	numOfPosts: number,
	offset: number,
) {
	if (typeof value !== "string") {
		return [];
	}
	if (isPrivate === "private" && user) {
		return await db.posts.findMany({
			skip: offset,
			take: numOfPosts,
			orderBy: {
				createdAt: "desc",
			},
			include: {
				author: {
					select: {
						name: true,
						avatar: true,
					},
				},
			},
			where: {
				OR: [
					{ brand: { contains: value, mode: "insensitive" } },
					{ title: { contains: value, mode: "insensitive" } },
					{ variety: { contains: value, mode: "insensitive" } },
					{ price: { contains: value, mode: "insensitive" } },
					{ tasting: { contains: value, mode: "insensitive" } },
					{ note: { contains: value, mode: "insensitive" } },
				],
				authorId: user,
			},
		});
	} else if (isPrivate === "public") {
		return await db.posts.findMany({
			skip: offset,
			take: numOfPosts,
			orderBy: {
				createdAt: "desc",
			},
			include: {
				author: {
					select: {
						name: true,
						avatar: true,
					},
				},
			},
			where: {
				OR: [
					{ brand: { contains: value, mode: "insensitive" } },
					{ title: { contains: value, mode: "insensitive" } },
					{ variety: { contains: value, mode: "insensitive" } },
					{ price: { contains: value, mode: "insensitive" } },
					{ tasting: { contains: value, mode: "insensitive" } },
					{ note: { contains: value, mode: "insensitive" } },
				],
				status: true,
			},
		});
	}
	return [];
}

async function findPostWithAllKeys(
	value: string | number,
	isPrivate: string,
	user: string | undefined,
) {
	if (typeof value !== "string") {
		return [];
	}
	if (isPrivate === "private" && user) {
		return await db.posts.findMany({
			include: {
				author: {
					select: {
						name: true,
						avatar: true,
					},
				},
			},
			where: {
				OR: [
					{ brand: { contains: value, mode: "insensitive" } },
					{ title: { contains: value, mode: "insensitive" } },
					{ variety: { contains: value, mode: "insensitive" } },
					{ price: { contains: value, mode: "insensitive" } },
					{ tasting: { contains: value, mode: "insensitive" } },
					{ note: { contains: value, mode: "insensitive" } },
				],
				authorId: user,
			},
		});
	} else if (isPrivate === "public") {
		return await db.posts.findMany({
			include: {
				author: {
					select: {
						name: true,
						avatar: true,
					},
				},
			},
			where: {
				OR: [
					{ brand: { contains: value, mode: "insensitive" } },
					{ title: { contains: value, mode: "insensitive" } },
					{ variety: { contains: value, mode: "insensitive" } },
					{ price: { contains: value, mode: "insensitive" } },
					{ tasting: { contains: value, mode: "insensitive" } },
					{ note: { contains: value, mode: "insensitive" } },
				],
				status: true,
			},
		});
	}
	return [];
}