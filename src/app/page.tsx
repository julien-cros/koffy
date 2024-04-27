import LeftSide from "@/components/leftSide";
import Feed from "@/components/feed";
import RightSide from "@/components/rightSide";

export default async function HomePage() {
  return (
    <div className="w-full h-full flex flex-row justify-around">
      <LeftSide />
      <Feed />
      <RightSide />
    </div>
  );
}
