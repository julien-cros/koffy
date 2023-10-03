import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { createUser, getUser } from "./actions";

export interface SessionInterface extends Session {
	user: User & {
		id: number;
		name: string;
		email: string;
		avatar: string;
	};
}

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
					await createUser(
						user.name as string,
						user.email as string,
						"password",
					);
				}

				return true;
			} catch (error: any) {
				console.log("error checking if user exists: ", error.message);
				return false;
			}
		},
	},
};

export async function getCurrentUser() {
	const session = (await getServerSession(
		authOptions,
	)) as SessionInterface | null;

	return session;
}