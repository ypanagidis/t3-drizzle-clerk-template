import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { users } from "db/schema";
import { eq } from "drizzle-orm";

export const deleteUserProcedure = protectedProcedure
  .input(z.object({ userId: z.number() }))
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.delete(users).where(eq(users.id, input.userId));
  });
