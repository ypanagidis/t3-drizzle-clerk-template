import { protectedProcedure } from "../../trpc";

export const getAll = protectedProcedure.query(async ({ ctx }) => {
  const { db } = ctx;
  const posts = await db.query.posts.findMany({
    with: { comments: true },
  });
  return posts;
});
