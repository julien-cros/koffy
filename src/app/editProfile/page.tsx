import { getCurrentUser } from "@/lib/actions";
import React from "react";
import EditProfileForm from "@/components/editProfileForm";
import { redirect } from "next/navigation";
import { getProfile } from "@/lib/actions";

const page = async () => {
  const session = await getCurrentUser();
  if (!session?.user.id) {
    redirect(`/`);
  }
  const profile = await getProfile(session.user.name);
  if (!profile) {
    redirect(`/`);
  }
  return (
    <div className="w-full h-screen justify-center items-center flex">
      <EditProfileForm profile={profile} />
    </div>
  );
};

export default page;
