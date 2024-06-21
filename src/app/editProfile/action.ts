"use server";

import { db } from "@/lib/db";

export async function createProfile(
  bio: string | null,
  location: string | null,
  userId: string,
) {
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

export async function updateProfile(
  bio: string | null,
  location: string | null,
  userId: string,
) {
  return await db.profile.update({
    where: {
      id: userId,
    },
    data: {
      bio,
      location,
    },
  });
}

export async function updateUser(
  userId: string,
  name: string | null,
  avatar: string | null,
  avatarKey: string | null,
) {
  const data: {
    name?: string;
    avatar?: string | null;
    avatarKey?: string | null;
  } = {};

  if (name !== null && name !== "") {
    data.name = name;
  }
  if (avatar !== null && avatar !== "") {
    data.avatar = avatar;
  }
  if (avatarKey !== null && avatarKey !== "") {
    data.avatarKey = avatarKey;
  }

  await db.user.update({
    where: {
      id: userId,
    },
    data: data,
  });
}

// export async function getImageSize(imageUrlBuffer: string, imageKeyBuffer: string) {
// 	console.log("imageUrlBuffer", imageUrlBuffer);
// 	console.log("imageKeyBuffer", imageKeyBuffer);
// 	if (imageUrlBuffer) {
// 		const url = await utapi.getSignedURL(imageKeyBuffer, {
// 			expiresIn: 60 * 60,
// 		});
// 		const img = document.createElement("img");
// 		img.src = url.url;
// 		img.onload = () => {
// 			console.log("img", img.width, img.height);
// 		};
// 		return ({ width: img.width, height: img.height });
// 	}
// 	return { width: 0, height: 0 }
// 	// const response = await fetch(image);
// 	// const blob = await response.blob();
// 	// return blob.size;
// }
