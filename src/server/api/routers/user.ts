import { z } from "zod";
import * as bcrypt from "bcrypt";

import {
    createTRPCRouter,
    publicProcedure,
} from "~/server/api/trpc";
import { users } from "~/server/db/schema";

const signUpInput = z.object({
    name: z.string().min(0),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8)
}).superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) { ctx.addIssue({ code: 'custom', message: "Passwords are not the same" }) }
});

export const userRouter = createTRPCRouter({
    signUp: publicProcedure
        .input(signUpInput)
        .mutation(async ({ ctx, input }) => {
            const hashPass = await bcrypt.hash(input.password, 10);

            await ctx.db.insert(users).values({ name: input.name, email: input.email, password: hashPass })
        }),
});
