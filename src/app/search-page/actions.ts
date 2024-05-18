import { getCurrentUser } from "@/lib/actions";
import { db } from "@/lib/db";

export async function findSearchPost(
	key: string,
	value: string | number,
	isPrivate: string,
) {
	const user = await getCurrentUser();
	if (isPrivate === "private" && !user) return null;
	if (key === "all")
		return findPostWithAllKeys(value, isPrivate, user?.user.id);
	if (isPrivate === "private") {
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
				[key]: {
					contains: value,
					mode: "insensitive",
				},
				authorId: user?.user.id,
			},
		});
		if (posts.length > 0) return posts;
		else return null;
	} else if (isPrivate === "public") {
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
				[key]: {
					contains: value,
					mode: "insensitive",
				},
				status: true,
			},
		});
		if (posts.length > 0) return posts;
		else return null;
	}
}

async function findPostWithAllKeys(
	value: string | number,
	isPrivate: string,
	user: string | undefined,
) {
	if (typeof value !== "string") {
		return null;
	}
	if (isPrivate === "private" && user) {
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
		if (posts.length > 0) return posts;
		return null;
	} else if (isPrivate === "public") {
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
		if (posts.length > 0) return posts;
		return null;
	}
}
