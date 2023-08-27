import { protectedProcedure } from "../../trpc";
import { users } from "db/schema";
import { createInsertSchema } from "drizzle-zod";

export const addUserProcedure = protectedProcedure
  .input(createInsertSchema(users))
  .mutation(async ({ ctx, input }) => {
    const { db } = ctx;
    return await db
      .insert(users)
      .values({ ...input })
      .onDuplicateKeyUpdate({ set: { ...input } });
  });
