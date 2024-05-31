"use server";

import { db } from "@/lib/db";

export async function createProfile(bio: string | null, location: string | null, userId: string) {
	await db.profile.create({
		data: {
			bio,
			location,
			user: {
				connect: {
					id: userId,
				},
			},
		},
	});
}


export async function updateProfile(bio: string | null, location: string | null, userId: string) {
	await db.profile.update({
		where: {
			id: userId,
		},
		data: {
			bio,
			location,
		},
	});
}