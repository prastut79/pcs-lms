// import crypto from "node:crypto";
// global.crypto ??= crypto;
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { prisma } from "@/db/prisma";

export const NextOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),

	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				// check to see if email and password is there
				if (!credentials?.email || !credentials.password) {
					throw new Error("Please enter an email and password");
				}

				// check to see if user exists
				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				});

				// if no user was found
				if (!user || !user?.password) {
					throw new Error("Incorrect Email or Password");
				}

				// check to see if password matches
				const passwordMatch = await bcrypt.compare(
					credentials.password,
					user.password
				);

				// if password does not match
				if (!passwordMatch) {
					throw new Error("Incorrect Email or Password");
				}

				return user;
			},
		}),
	],
	callbacks: {
		async redirect({ url, baseUrl }) {
			return baseUrl;
		},

		async jwt({ token, user }) {
			if (user) {
				token.role = user.role;
				token.id = user.id as number;
			}
			return token;
		},

		async session({ session, token, user }) {
			if (session.user) {
				session.user.role = token.role;
				session.user.id = token.id;
			}
			return session;
		},
	},

	pages: {
		signIn: "/login",
	},
	debug: process.env.NODE_ENV === "development",
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(NextOptions);

export { handler as GET, handler as POST };
// export default NextAuth(NextOptions);
