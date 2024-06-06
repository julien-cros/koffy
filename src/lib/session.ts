import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from "jsonwebtoken";
import type { AdapterUser } from "next-auth/adapters";
import type { JWT } from "next-auth/jwt";
import { type NextAuthOptions, type User } from "next-auth";

import { createUser, getProfile, getUser, getUserByName } from "./actions";
import { createProfile } from "@/app/editProfile/action";

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  posts?: {
    id: number;
    title: string;
    brand: string;
    createAt: string;
    updatedAt: string;
  };
  wishlist?: {
    id: number;
    title: string;
    brand: string;
    price: string;
    url: string;
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: process.env.NEXTAUTH_URL,
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret,
      );

      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret);
      return decodedToken as JWT;
    },
  },
  theme: {
    colorScheme: "light",
    logo: "/coffee.png",
  },
  callbacks: {
    async session({ session }) {
      const email = session?.user?.email as string;
      try {
        const data = (await getUser(email)) as { user?: UserProfile };

        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...data,
          },
        };
        return newSession;
      } catch (error: any) {
        console.error("error retrieving user data: ", error.message);
        return session;
      }
    },
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        const userExists = await getUser(user?.email as string);

        if (!userExists) {
          const nameAlreadyExist = await getUserByName(user.name as string);
          if (nameAlreadyExist) {
            if (user.name && user.name?.length > 14)
              user.name = user.name?.substring(0, 14);
            const nameWithNumber = `${user.name?.replace(/\s/g, "")}${Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000}`;
            nameWithNumber.replace(/\s/g, "");
            const createdUser = await createUser(
              nameWithNumber as string,
              user.email as string,
              user.image as string,
            );
            await createProfile(null, null, createdUser.id);
          } else {
            if (user.name && user.name?.length > 20)
              user.name = user.name?.substring(0, 20);
            const createdUser = await createUser(
              user.name?.replace(/\s/g, "") as string,
              user.email as string,
              user.image as string,
            );
            await createProfile(null, null, createdUser.id);
          }
        } else {
          const profile = await getProfile(userExists.name);
          if (!profile) {
            await createProfile(null, null, userExists.id);
          }
        }

        return true;
      } catch (error: any) {
        console.log("error checking if user exists: ", error.message);
        return false;
      }
    },
  },
};
