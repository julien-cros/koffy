"use server";

import { FormState } from "@/components/FormPage";
import { getCurrentUser } from "@/lib/session";
import { db } from "@/lib/db";

 export async function getData() {
	const user = await getCurrentUser();

	if (!user?.user.id) {
		throw new Error("Unauthorized");
	}

	return user;
}

export default async function submit(form: FormState) {
	const user = await getData()
	try {
		await db.posts.create({
			data: {
				title: form.title,
				brand: form.brand,
				variety: form?.variety,
				tasting: form?.tasting,
				rate: form?.rate,
				note: form?.note,
				price: form?.price,
				weight: form?.weight,
				status: form?.status,
				author: {
					connect: {
						id: user.user.id,
					},
				},
			},
		});
		return true;
	} catch (error) {
		console.log("error:", error)
		return error;
	}
}

export async function updatePost(id: string, form: FormState, type: string) {
	const user = await getData()
	const post = await checkUser(id, user.user.id);
	if (!post) {
		throw new Error("Unauthorized");
	}
	if (type === "delete") {
		try {
			await db.posts.delete({
				where: {
					id,
				},
			});
			return true;
		} catch (error) {
			console.log(error)
			return error;
		}
	}
	else if (type === "update") {
		try {
			await db.posts.update({
				where: {
					id,
				},
				data: {
					title: form?.title,
					brand: form?.brand,
					variety: form?.variety,
					tasting: form?.tasting,
					rate: form?.rate,
					note: form?.note,
					price: form?.price,
					weight: form?.weight,
					status: form?.status,
				},
			});
			return true;
	} catch (error) {
		console.log(error)
		return error;
	}
}
}

export const findValidPost = async (userId: string, brand: string, title: string) => {
	if (!userId) {
		throw new Error("Unauthorized");
	}
	const post = await db.posts.findFirst({
		where: {
			authorId: userId,
			title: title,
			brand: brand,
		},
	}
	);
	if (post) {
		return true;
	}
	return false;
}

export const checkUser = async (id: string, userId: string) => {
	const post = await db.posts.findUnique({
		where: {
			id,
		},
	});
	if (!post) {
		// throw new Error("Post not found");
		return null;
	}
	if (post.authorId !== userId) {
		// throw new Error("Unauthorized");
		return null;
	}
	return post;
}