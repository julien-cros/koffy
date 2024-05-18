"use server";

import type { FormState } from "@/app/types/types";
import { getCurrentUser } from "@/lib/actions";
import { db } from "@/lib/db";
import { utapi } from "../server/uploadthing";
// import { uploadThingByUrl } from "@/lib/uploadThingActions";
// import { utapi } from "../server/uploadthing";

export async function getData() {
  const user = await getCurrentUser();

  if (!user?.user.id) {
    throw new Error("Unauthorized");
  }

  return user;
}

// export async function UploadFile(file: File) {
//   try{
// 		const data = new FormData();
// 		data.append("file", file);
// 		data.append("upload_preset", "coffee");
// 		data.append("cloud_name", "dwx7x0j8d");
// 		const response = await fetch(
// 			"https://api.cloudinary.com/v1_1/dwx7x0j8d/image/upload",
// 			{
// 				method: "POST",
// 				body: data,
// 			}
// 		);
// 		const result = await response.json();
// 		return result.url;
// 	}
// 	catch(error){
// 		console.log(error);
// 	}
// }

export const updateUser = async (user: any, id: string | undefined) => {
  if (!id) return null;
  await db.user.update({
    where: {
      id,
    },
    data: {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },
  });
};

export default async function submit(form: FormState) {
  const user = await getData();

  // const imageUrl = await uploadThingByUrl(form.imageUrl);

  try {
    const post = await db.posts.create({
      data: {
        title: form.title,
        brand: form.brand,
        variety: form.variety,
        tasting: form.tasting,
        rate: form.rate,
        note: form?.note,
        price: form?.price,
        weight: form?.weight,
        status: form.status,
        imageUrl: form?.imageUrl,
        imageKey: form?.imageKey,
        country: form?.country,
        domain: form?.domain,
        altitude: form?.altitude,
        process: form?.process,
        type: form?.type,
        author: {
          connect: {
            id: user.user.id,
          },
        },
      },
    });
    return post;
  } catch (error) {
    console.log("error:", error);
    return null;
  }
}

export async function deleteImage(imageUrl: string | null) {
  if (!imageUrl) {
    return null;
  }
  await utapi.deleteFiles(imageUrl);
}

export async function updatePost(
  postId: string,
  form: FormState,
  type: string,
) {
  const user = await getData();
  const post = await checkUserByPost(postId, user.user.id);
  if (!post) {
    throw new Error("Unauthorized");
  }
  if (type === "delete") {
    await deleteImage(post.imageKey);
    try {
      await db.posts.delete({
        where: {
          id: postId,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  } else if (type === "update") {
    try {
      await db.posts.update({
        where: {
          id: postId,
        },
        data: {
          title: form?.title,
          brand: form?.brand,
          variety: form.variety,
          tasting: form?.tasting,
          rate: form.rate,
          note: form?.note,
          price: form?.price,
          weight: form?.weight,
          status: form?.status,
          imageUrl: form?.imageUrl,
          imageKey: form?.imageKey,
          country: form?.country,
          domain: form?.domain,
          altitude: form?.altitude,
          process: form?.process,
          type: form?.type,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export const findValidPost = async (
  userId: string,
  brand: string,
  title: string,
) => {
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const post = await db.posts.findFirst({
    where: {
      authorId: userId,
      title: title,
      brand: brand,
    },
  });
  if (post) {
    return true;
  }
  return false;
};

export const checkUserByPost = async (id: string, userId: string) => {
  const post = await db.posts.findUnique({
    where: {
      id,
    },
  });
  if (!post) {
    return null;
  }
  if (post.authorId !== userId) {
    return null;
  }
  return post;
};
