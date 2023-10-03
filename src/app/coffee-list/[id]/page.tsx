import ExpandedCard from "@/components/ExpandedCard";
import { getPostFromId } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session";

type PageProps = {
  params: {
    id: string;
  };
};

const page = async ({ params }: PageProps) => {
	const post = await getPostFromId(params.id);
	const session = await getCurrentUser();

  return (
	<div>
		<ExpandedCard post={post} session={session} id={params.id}/>
	</div>
  );
};

export default page;
