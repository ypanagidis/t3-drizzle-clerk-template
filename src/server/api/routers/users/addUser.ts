import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { users } from "db/schema";

export const addUserProcedure = protectedProcedure
  .input(
    z.object({
      firstName: z.string(),
      lastName: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const { firstName, lastName } = input;
    const { db } = ctx;

    return await db
      .insert(users)
      .values({ firstName: firstName, lastName: lastName });
  });
