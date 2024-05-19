import LeftSide from "@/components/leftSide";
import Feed from "@/components/feed";
import { RightSide } from "@/components/rightSide";
import { getCurrentUser } from "@/lib/actions";

export default async function HomePage() {
  const session = await getCurrentUser();

  return (
    <div className="w-full h-full flex flex-row">
      <div className="flex-1 flex justify-end">
        {/* <LeftSide session={session} /> */}
      </div>
      <div className="flex-1 flex justify-center items-center">
        <Feed />
      </div>
      <div className="flex-1 flex justify-start">
        <RightSide session={session} />
      </div>
    </div>
  );
}
