import LeftSide from "@/components/leftSide";
import Feed from "@/components/feed";
import { RightSide } from "@/components/rightSide";
import { getCurrentUser } from "@/lib/session";

export default async function HomePage() {
  const session = await getCurrentUser();

  return (
    <div className="w-full h-full pt-24 flex flex-row space-x-4 md:space-x-6 justify-between">
      <div className="flex-1 flex justify-end">
        <LeftSide session={session} />
      </div>
      <div className="flex-1 flex justify-center items-center">
        <Feed />
      </div>
      <div className="flex-1 flex justify-start">
        <RightSide />
      </div>
    </div>
  );
}
