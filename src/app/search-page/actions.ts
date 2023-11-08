import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function findSearchPost(key: string, value: string | number, isPrivate: string) {
	const user = await getCurrentUser();

	if (isPrivate === "private" && user) {
		const posts = await db.posts.findMany({
			where: {
				[key]: {
					contains: value,
					mode: 'insensitive',
				},
				authorId: user.user.id,
			},
		}
		)
		if (posts.length > 0) return posts;
		else return null;
	}
	else if (isPrivate === "public") {
		const posts = await db.posts.findMany({
			where: {
				AND: [
					{
						[key]: {
							contains: value,
							mode: 'insensitive',
						},
						status: true,
					},
					{
						OR: [
							{
								status: false,
							},
							{
								authorId: user?.user.id,
							}
						]
					}

				],
			}
		}
		)
		if (posts.length > 0) return posts;
		else return null;
	}

}