"use server";

import { db } from "@/lib/db";
// import { getCurrentUser } from "@/lib/actions";

export const checkUserById = async (userId: string, sessionId?: string) => {
	if (!sessionId) {
		return false;
	} else if (userId === sessionId) {
		return db.profile.findUnique({
			include: {
				user: {
					select: {
						id: true,
						name: true,
						avatar: true,
					},
				},
			},
			where: {
				userId: sessionId,
			},
		});
	}
};

export const getNumOfFollowers = async (user: string | undefined | null) => {
	if (!user) {
		return null;
	}
	const followers = await db.follows.findMany({
		where: {
			following: {
				name: user,
			},
		},
	});
	return followers.length;
};

export const getNumOfFollowings = async (user: string | undefined) => {
	const followings = await db.follows.findMany({
		where: {
			follower: {
				name: user,
			},
		},
	});
	return followings.length;
};

export const FollowAndUnfollow = async (
	userId: string | undefined,
	sessionUserId: string | undefined,
	isFollowing: boolean,
) => {
	if (!sessionUserId || !userId) {
		return null;
	}

	if (isFollowing) {
		await db.follows.delete({
			where: {
				followerId_followingId: {
					followerId: sessionUserId,
					followingId: userId,
				},
			},
		});
		return "unfollowed";
	} else {
		await db.follows.create({
			data: {
				followerId: sessionUserId,
				followingId: userId,
			},
		});
		return "followed";
	}
};

export const getFollowStatus = async (
	userId: string | undefined,
	sessionUserId: string | undefined,
) => {
	if (!sessionUserId || !userId) {
		return false;
	}

	if (!sessionUserId) {
		return false;
	}
	const follow = await db.follows.findFirst({
		where: {
			followerId: sessionUserId,
			followingId: userId,
		},
	});
	if (follow) {
		return true;
	}
	return false;
};
