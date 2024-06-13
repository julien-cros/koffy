"use server";

import { db } from "@/lib/db";

export async function savePost(id: string, userId: string) {
	const alereadySaved = await getSaved(id, userId);

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

export async function getSaved(postId: string, userId: string | null | undefined) {
	const saved = await db.saved.findFirst({
		where: {
			userId,
			postId,
		},
	});
	return saved;
}
