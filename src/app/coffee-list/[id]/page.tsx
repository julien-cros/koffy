import ExpandedCard from "@/components/ExpandedCard";
import { getPostFromId, getUserFromId } from "@/lib/actions";

type PageProps = {
  params: {
    id: string;
  };
};

const page = async ({ params }: PageProps) => {
	const user = await getUserFromId(params.id);
	const post = await getPostFromId(params.id);

	const isMine = user ? true : false;
	console.log(isMine);
  return (
	<div>
		<ExpandedCard post={post} id={params.id} isMine={isMine}/>
	</div>
  );
};

export default page;
