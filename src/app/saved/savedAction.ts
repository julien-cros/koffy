"use server";

import { db } from "@/lib/db";

export async function savePost(id: string, userId: string) {
	const alereadySaved = await getSavedPost(id, userId);

	if (alereadySaved) {
		await db.saved.delete({
			where: {
				id: alereadySaved.id,
			},
		});
		return false;
	} else {
		await db.saved.create({
			data: {
				userId,
				postId: id,
			},
		});
		return true;
	}
}

export async function getSavedPost(postId: string, userId: string | null | undefined) {
	if (!userId || !postId) return null;
	return await db.saved.findFirst({
		where: {
			userId,
			postId,
		},
	});
}


export async function getSavedPostPacked(userId: string | null | undefined, NumbOfPosts: number, PostOffset: number) {
	if (!userId) return [];
	return await db.saved.findMany({
		take: NumbOfPosts,
		skip: PostOffset,
		where: {
			userId,
		},
		orderBy: {
			createdAt: "desc",
		},
		include: {
			post: {
				include: {
					author: {
						select: {
							name: true,
							avatar: true,
						},
					},
				},
			}

		},
	});
}