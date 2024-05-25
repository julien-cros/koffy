"use client";

import { ProfileInterface } from "@/app/types/types";

type Props = {
  profile: ProfileInterface;
};

export default function EditProfileForm({ profile }: Props) {
  return (
    <form>
      <h1>Edit Profile Form</h1>
      <p>{profile?.user?.name}</p>
      <p>{profile?.user?.avatar}</p>
      <p>{profile?.bio}</p>
      <p>{profile?.location}</p>
    </form>
  );
}
