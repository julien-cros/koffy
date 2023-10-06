import ExpandedCard from "@/components/ExpandedCard";
import { getPostFromId } from "@/lib/actions";

type PageProps = {
  params: {
    id: string;
  };
};

const page = async ({ params }: PageProps) => {
	const post = await getPostFromId(params.id);

  return (
	<div>
		<ExpandedCard post={post} id={params.id}/>
	</div>
  );
};

export default page;
