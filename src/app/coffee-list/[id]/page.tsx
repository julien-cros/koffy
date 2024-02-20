import ExpandedCard from "@/components/ExpandedCard";
import { getPostFromId, getUserFromId } from "@/lib/actions";
import { Metadata } from "next";


// TODO: change id to title, brand, author, or something concret and unique
type PageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata | undefined> {
  if (!params?.id) {
    return;
  }
  
	const post = await getPostFromId(params.id);

  if (!post) {
    return;
  }

  return {
    metadataBase: new URL("https://koffy.app"),
    title: post.title,
    ...{ keywords: (post.title, post.brand, post.variety) },
		description: (post.tasting || ''),
    openGraph: {
      title: post.title,
			description: (post.tasting || ''),
      url: `https://koffy.app/${post.id}`,
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
    },
    twitter: {
      title: post.title,
      description: post.tasting || '',
      card: "summary_large_image",
    },
  };
}

const page = async ({ params }: PageProps) => {
  const user = await getUserFromId(params.id);
  const post = await getPostFromId(params.id);

  const isMine = user ? true : false;
  return (
    <div>
      <ExpandedCard post={post} id={params.id} isMine={isMine} />
    </div>
  );
};

export default page;
