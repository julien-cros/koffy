
import { getUserPosts } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session";
import React from "react";
import CoffeeListComponent from "@/components/CoffeeListComponent";


export default async function CoffeeListPage() {
  const session = await getCurrentUser();
  var posts = null;
  let isLogged = !session ? false : true ;

  if (session) {
    posts = await getUserPosts(session?.user?.id);
  }

  return (
	<div className="h-full w-full">
		<CoffeeListComponent posts={posts} isLogged={isLogged}/>
	</div>
  );
}
