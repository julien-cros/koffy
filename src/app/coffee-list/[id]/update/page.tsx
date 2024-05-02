import { getCurrentUser } from "@/lib/session";
import React from "react";
import { checkUser } from "@/app/create-card/actions";
import UpdateCardForm from "@/components/updateCardForm";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

const UpdateCard = async ({ params }: Props) => {
  const session = await getCurrentUser();

  if (!session || !session?.user) {
    redirect(`/coffee-list/${params.id}`);
  }

  const post = await checkUser(params.id, session.user.id);

  if (!post) {
    redirect(`/coffee-list/${params.id}`);
  }

  return (
    <UpdateCardForm
      post={{
        title: post.title,
        brand: post.brand,
        price: post.price,
        tasting: post.tasting,
        note: post.note,
        variety: post.variety,
        rate: post.rate,
        status: post.status,
        weight: post.weight,
        country: post.country,
        domain: post.domain,
        altitude: post.altitude,
        process: post.process,
        type: post.type,
        imageUrl: post.imageUrl,
        imageKey: post.imageKey,
      }}
      session={session}
      postId={post.id}
    />
  );
};

export default UpdateCard;
