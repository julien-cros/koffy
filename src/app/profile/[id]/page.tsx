"use client";

import Card from "@/components/card";
import { getProfile, getUserPosts } from "@/lib/actions";
import React from "react";
import {
  // FollowAndUnfollow,
  getFollowStatus,
  getNumOfFollowers,
  getNumOfFollowings,
} from "@/app/profile/profileAction";
import { getCurrentUser } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/loader";

type PageProps = {
  params: {
    id: string;
  };
};

const profilePage = ({ params }: PageProps) => {
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
    return <div>Profile not found</div>;
  }

  var isFollowing = queryFollowingStatus ? queryFollowingStatus : false;
  const numOfFollowers = queryFollowers ? queryFollowers : 0;
  const numOfFollowings = queryFollowings ? queryFollowings : 0;
  const post = queryPost;
  const numOfPosts = post?.length || 0;

  // const handlefollow = () => {
  //   const {
  //     isPending,
  //     error,
  //     data: followData,
  //   } = useQuery({
  //     queryKey: ["repoData"],
  //     queryFn: async () => {
  //       const res = await FollowAndUnfollow(
  //         profile.user.id,
  //         session?.user.id,
  //         isFollowing ? true : false
  //       );
  //       return res;
  //     },
  //   });

  //   if (isPending) return <Loader />;

  //   if (error)
  //     return "An error has occurred: " + error.message + " try again later";

  //   if (followData === "followed") {
  //     isFollowing = true;
  //   } else if (followData === "unfollowed") {
  //     isFollowing = false;
  //   }
  // };

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
          <div className="text-lg font-light text-neutral-700 dark:text-neutral-300 flex flex-col justify-between">
            <button
              className="text-sm border-[1px] border-black dark:border-neutral-700 rounded-md py-1 px-2"
              // onClick={handlefollow}
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
