import { FormState } from "@/components/FormPage";
import { SessionInterface } from "@/lib/session";
import { db } from "./db";

const isProduction = process.env.NODE_ENV === "production";
const serverUrl = isProduction || "http://localhost:3000/api/auth/token";

export const createUser = async (
  name: string,
  email: string,
  avatar: string,
) => {
  await db.user.create({
    data: {
      name,
      email,
      avatar,
    },
  });
};

export const getUser = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });
//   console.log("user: ", user);
  return user;
};

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json();
  } catch (err) {
    throw err;
  }
};

export const CreatePost = async (form: FormState, user: SessionInterface) => {
  console.log({
    form,
    user,
  });

//   console.log("user id: ", user.user.id);
//   console.log("user: ", user);
//   console.log("form: ", form);

  await db.posts.create({
    data: {
      title: form.title,
      brand: form.brand,
      variety: form.variety,
      tasting: form.tasting,
      rate: form.rate,
      note: form.note,
      price: form.price,
      author: {
        connect: {
          id: user.user.id,
        },
      },
    },
  });
};

export const getPost = async (title: string) => {
  const post = await db.posts.findUnique({
    where: {
      title,
    },
  });
  return post;
};

export const getUserPosts = async (authorId: string) => {
	const posts = await db.posts.findMany({
		where: {
			authorId,
		}
	})
	return posts;
}

