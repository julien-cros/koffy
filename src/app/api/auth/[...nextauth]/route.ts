import NextAuth from "next-auth";
import googleProvider from "next-auth/providers/google";

// export default NextAuth({
// 	session: {
// 		strategy: 'jwt'
// 	},
// 	providers: [
// 		googleProvider({
// 			clientId: process.env.GOOGLE_CLIENT_ID ?? "",
// 			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
// 		})
// 	]
// })

import { authOptions } from "@/lib/session";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// // const handler = NextAuth({
// //   providers: [
// // 	googleProvider({
// // 		clientId: process.env.GOOGLE_CLIENT_ID ?? "",
// // 		clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
// // 	})
// //   ]
// // })

// export { handler as GET, handler as POST }

// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";

// // const prisma = new PrismaClient();

// // export const authOptions: NextAuthOptions = {
// // 	session: {
// // 		strategy: 'jwt'
// // },
// // adapter: PrismaAdapter(prisma),
// // providers: [
// // 	GoogleProvider({
// // 		clientId: process.env.GOOGLE_CLIENT_ID ?? "",
// // 		clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
// // 	}),
// // ],
// // };

// // export default NextAuth(authOptions);
// export default NextAuth({
// //   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
// 		clientId: process.env.GOOGLE_CLIENT_ID ?? "",
// 		clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
//     }),
//   ],
// });
