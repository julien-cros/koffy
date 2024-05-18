"use client";

import Card from "@/components/card";
import { getProfile, getUserPosts } from "@/lib/actions";
import {
  FollowAndUnfollow,
  getFollowStatus,
  getNumOfFollowers,
  getNumOfFollowings,
} from "@/app/profile/profileAction";
import { getCurrentUser } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/loader";
import { useRouter } from "next/navigation";
import { useState } from "react";

type PageProps = {
  params: {
    id: string;
  };
};

const profilePage = ({ params }: PageProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const router = useRouter();
  const { data: querySession, isLoading: isLoadingSession } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const res = await getCurrentUser();
      return res;
    },
  });

  const session = querySession;

  const { data: queryProfile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["repoData", params.id],
    queryFn: async () => {
      const res = await getProfile(params.id);
      return res;
    },
  });

  const profile = queryProfile;

  const { data: queryFollowings, isLoading: isLoadingFollowings } = useQuery({
    queryKey: ["followings", profile?.user?.name],
    queryFn: async () => {
      const res = await getNumOfFollowings(profile?.user.name);
      return res;
    },
    enabled: !!profile?.user?.name,
  });

  const { data: queryFollowers, isLoading: isLoadingFollowers } = useQuery({
    queryKey: ["followers", profile?.user?.name],
    queryFn: async () => {
      const res = await getNumOfFollowers(profile?.user.name);
      return res;
    },
    enabled: !!profile?.user?.name,
  });

  const { data: queryFollowingStatus, isLoading: isLoadingFollowingStatus } =
    useQuery({
      queryKey: ["followingStatus", profile?.user?.name, session?.user?.name],
      queryFn: async () => {
        const res = await getFollowStatus(profile?.user.id, session?.user.id);
        setIsFollowing(res ? true : false);
        return res;
      },
      enabled: !!profile?.user?.name && !!session?.user?.name,
    });

  const { data: queryPost, isLoading: isLoadingPost } = useQuery({
    queryKey: ["post", profile?.user?.name],
    queryFn: async () => {
      const res = await getUserPosts(profile?.user.id);
      return res;
    },
    enabled: !!profile?.user?.name,
  });

  if (
    isLoadingSession ||
    isLoadingProfile ||
    isLoadingFollowings ||
    isLoadingFollowers ||
    isLoadingFollowingStatus ||
    isLoadingPost
  ) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!profile || !profile.user) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <h1 className="text-xl font-light">No user found</h1>
      </div>
    );
  }

  const numOfFollowers = queryFollowers ? queryFollowers : 0;
  const numOfFollowings = queryFollowings ? queryFollowings : 0;
  const post = queryPost;
  const numOfPosts = post?.length || 0;
  void queryFollowingStatus;

  const handleFollow = async () => {
    if (!session || !profile) {
      router.push("/");
    }
    if (session?.user?.name === profile?.user.name) {
      router.push("/profile/edit");
    }

    const followData = await FollowAndUnfollow(
      profile.user.id,
      session?.user.id,
      isFollowing ? true : false,
    );
    if (followData === "followed") {
      setIsFollowing(true);
    }
    if (followData === "unfollowed") {
      setIsFollowing(false);
    }
  };
  // TODO: find a way to rerender only follower/following counter
  return (
    <div className="w-full p-5 pt-24 space-y-10 flex justify-center items-center flex-col">
      <div className="w-full max-w-5xl mx-auto h-fit bg-white  dark:bg-neutral-900 rounded-lg border-[1px] border-black dark:border-neutral-400 p-4">
        <div className="flex justify-between">
          <div className="flex space-x-2 items-center">
            <img
              src={profile?.user.avatar || "/images/default-profile.svg"}
              alt={profile?.user.name}
              className="w-24 h-24 rounded-full"
            />
            <h1 className="text-xl font-light">{profile?.user.name}</h1>
          </div>
          <div className="text-lg font-light text-neutral-700 dark:text-neutral-300 flex flex-col justify-between items-end">
            <button
              className="text-sm border-[1px] border-black dark:border-neutral-700 rounded-md py-1 px-2"
              onClick={() => handleFollow()}
            >
              {session?.user?.name !== profile?.user.name
                ? isFollowing
                  ? "Following"
                  : "Follow"
                : "Edit Profile"}
            </button>
            {profile?.location}
          </div>
        </div>
        <div className="text-lg font-light text-neutral-700 dark:text-neutral-300 mt-4 pt-4 border-t-[1px] border-black dark:border-neutral-400">
          bio: <br /> {profile?.bio}
        </div>
        <div className="text-lg font-light text-neutral-700 dark:text-neutral-300 mt-4 pt-4 border-t-[1px] border-black dark:border-neutral-400 flex justify-around">
          <p> {numOfPosts} posts </p>
          <p> {numOfFollowers} followers </p>
          <p> {numOfFollowings} following </p>
        </div>
      </div>
      {/* TODO: query 8 by 8 while scrolling */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-10">
        {post?.map((post) => (
          <div className="w-full" key={post.id}>
            <Card
              id={post.id}
              author={post?.author?.name}
              title={post.title}
              brand={post.brand}
              country={post.country}
              tasting={post.tasting}
              rate={post.rate}
              createdAt={post.createdAt}
              imageUrl={post.imageUrl}
              avatar={post?.author?.avatar}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default profilePage;
