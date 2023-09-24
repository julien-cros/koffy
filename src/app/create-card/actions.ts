"use server";

import { FormState } from "@/components/FormPage";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export default async function submit(form: FormState, type: string) {
  const user = await getCurrentUser();

  if (!user?.user.id) {
    throw new Error("Unauthorized");
  }

  if (type === "create") {
  return await db.posts.create({
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

} else if (type === "update") {
	  return await db.posts.update({
	where: {
	  id: form.title,
	},
	data: {
	  title: form.title,
	  brand: form.brand,
	  variety: form.variety,
	  tasting: form.tasting,
	  rate: form.rate,
	  note: form.note,
	  price: form.price,
	},
  });
}
}
