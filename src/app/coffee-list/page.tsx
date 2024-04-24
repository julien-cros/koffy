import { getUserPosts } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session";
import React from "react";
import CoffeeListComponent from "@/components/CoffeeListComponent";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata | undefined> {
  return {
    metadataBase: new URL("https://koffy.app"),
    title: "Your Coffee List",
    ...{ keywords: "your coffee, coffee list, coffee history, coffee records" },
    description: "A list of all the coffee you have ever tasted",
    openGraph: {
      title: "Your Coffee List",
      description: "A list of all the coffee you have ever tasted",
      url: `https://koffy.app/coffee-list`,
      type: "website",
    },
    twitter: {
      title: "Your Coffee List",
      description: "A list of all the coffee you have ever tasted",
      card: "summary_large_image",
    },
  };
}

export default async function CoffeeListPage() {
  const session = await getCurrentUser();
  var posts = null;
  let isLogged = !session ? false : true;

  if (session) {
    posts = await getUserPosts(session?.user?.id);
  }

  return (
    <div className="h-full w-full">
      <CoffeeListComponent
        posts={posts}
        isLogged={isLogged}
        session={session}
      />
    </div>
  );
}
