import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { users } from "db/schema";

export const addUserProcedure = protectedProcedure
  .input(
    z.object({
      firstName: z.string(),
      lastName: z.string(),
      gender: z.string(),
      age: z.number(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const { db } = ctx;

    return await db.insert(users).values({ ...input });
  });
