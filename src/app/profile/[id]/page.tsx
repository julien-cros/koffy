"use client";

import Card from "@/components/card";
import { getProfile } from "@/lib/actions";
import {
  FollowAndUnfollow,
  getFollowStatus,
  getNumOfFollowers,
  getNumOfFollowings,
  getUserPostPacked,
} from "@/app/profile/profileAction";
import { getCurrentUser } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/loader";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RightSide } from "@/components/rightSide";
import { LeftSide } from "@/components/leftSide";
import { DefaultHeader } from "@/components/defaultHeader";
import Image from "next/image";
import LoadMorePost from "@/components/loadMorePost";

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
      const res = await getUserPostPacked(
        profile?.user.id,
        session?.user.id,
        8,
        0
      );
      return res;
    },
    enabled: !!profile?.user?.name,
  });

  if (isLoadingSession) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  // if (!profile || !profile.user) {
  //   return (
  //     <div className="h-screen w-full flex items-center justify-center">
  //       <h1 className="text-xl font-light">No user found</h1>
  //     </div>
  //   );
  // }

  const numOfFollowers = queryFollowers ? queryFollowers : 0;
  const numOfFollowings = queryFollowings ? queryFollowings : 0;
  const post = queryPost;
  const numOfPosts = post?.length || 0;
  void queryFollowingStatus;

  const handleFollow = async () => {
    if (!session || !profile) {
      return;
    }
    if (session?.user?.name === profile?.user.name) {
      router.push("/editProfile");
    }

    const followData = await FollowAndUnfollow(
      profile?.user.id,
      session?.user.id,
      isFollowing ? true : false
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
    <div className="flex flex-row min-h-screen">
      <div className="flex flex-1 md:justify-end">
        <LeftSide session={session} />
      </div>
      <div className="flex justify-center w-full md:max-w-xl mx-auto">
        <div className="relative w-full h-full flex flex-row">
          <div className="w-full flex flex-col border-0 md:border-x-[1px] border-neutral-700 dark:border-neutral-400">
            <DefaultHeader title="Profile" />
            <div className="w-full max-w-5xl mx-auto p-4  border-b-[1px] border-y-black dark:border-neutral-400 ">
              {isLoadingProfile ? (
                <Loader />
              ) : (
                <div className="flex justify-between">
                  <div className="flex space-x-2 items-center">
                    <Image
                      src={
                        profile?.user.avatar || "/images/default-profile.svg"
                      }
                      alt={profile?.user.name || "avatar"}
                      className="w-24 h-24 rounded-full"
                      width={96}
                      height={96}
                    />
                    <h1 className="text-xl font-light">{profile?.user.name}</h1>
                  </div>
                  <div className="text-lg font-light text-neutral-700 dark:text-neutral-300 flex flex-col justify-between items-end">
                    <button
                      className="text-sm border-[1px] border-black dark:border-neutral-700 rounded-md py-1 px-2"
                      onClick={() => handleFollow()}
                    >
                      {isLoadingFollowingStatus ? (
                        <Loader />
                      ) : session?.user?.name !== profile?.user.name ? (
                        isFollowing ? (
                          "Following"
                        ) : (
                          "Follow"
                        )
                      ) : (
                        "Edit Profile"
                      )}
                    </button>
                    {profile?.location}
                  </div>
                </div>
              )}
              <div className="text-lg break-all font-light text-neutral-700 dark:text-neutral-300 mt-4 pt-4 border-t-[1px] border-neutral-300 dark:border-neutral-700">
                <p>bio:</p>
                <p className="pl-5">{profile?.bio}</p>
              </div>
              <div className="text-lg font-light text-neutral-700 dark:text-neutral-300 mt-4 pt-4 border-t-[1px] border-neutral-300 dark:border-neutral-700 flex justify-around">
                <>
                  <p className="flex flex-row gap-2">
                    {isLoadingPost ? <Loader /> : numOfPosts} posts
                  </p>
                  <p className="flex flex-row gap-2">
                    {isLoadingFollowers ? <Loader /> : numOfFollowers} followers
                  </p>
                  <p className="flex flex-row gap-2">
                    {isLoadingFollowings ? <Loader /> : numOfFollowings}{" "}
                    following
                  </p>
                </>
              </div>
            </div>
            {/* TODO: query 8 by 8 while scrolling */}
            <div className="flex flex-col justify-center w-full">
              {isLoadingPost ? (
                <Loader />
              ) : (
                post?.map((post) => (
                  <div className="" key={post.id}>
                    <Card
                      id={post.id}
                      clickable={true}
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
                ))
              )}
              <LoadMorePost authorId={profile?.user.id} session={session} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 justify-start">
        <RightSide session={session} />
      </div>
    </div>
  );
};

export default profilePage;
