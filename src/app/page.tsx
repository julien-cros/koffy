import Feed from "@/components/feed";
import { getCurrentUser } from "@/lib/actions";

export default async function HomePage() {
  const session = await getCurrentUser();
  return <Feed session={session} />;
}
