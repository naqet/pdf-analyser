import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import {
    getServerSession,
    type DefaultSession,
    type NextAuthOptions,
} from "next-auth";

import type { Adapter } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";

import { db } from "~/server/db";
import { sqliteTable, users } from "~/server/db/schema";
import * as bcrypt from "bcrypt";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            // ...other properties
            // role: UserRole;
        } & DefaultSession["user"];
    }

    // interface User {
    //   // ...other properties
    //   // role: UserRole;
    // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
    callbacks: {
        session: ({ session, user }) => ({
            ...session,
            user: {
                ...session.user,
                id: user.id,
            },
        }),
    },
    pages: {
        signIn: '/auth/login',
    },
    adapter: DrizzleAdapter(db, sqliteTable) as Adapter,
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    if (!credentials) return null;

                    const { email, password } = credentials;

                    if (!email || !password) return null

                    const user = await db.query.users.findFirst({where: eq(users.email, email)});

                    if (!user) return null;

                    const validPass = await bcrypt.compare(password, user.password);

                    if (validPass) {
                        return {id: user.id}
                    }
                } catch {
                    return null
                }

                return null;
            }
        })
    ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
