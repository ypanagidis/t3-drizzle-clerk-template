import { z } from "zod";
import { protectedProcedure } from "../../trpc";

const inputSchema = z.object({
  limit: z.number(),
  pageNumber: z.number(),
});

export const getUserByLimitAndPageProcedure = protectedProcedure
  .input(inputSchema)
  .query(async ({ ctx, input }) => {
    const { limit, pageNumber } = input;
    const { db } = ctx;
    const res = await db.query.users.findMany({
      limit: limit,
      offset: pageNumber * limit,
    });
    return res;
  });
