import { protectedProcedure } from "../../trpc";

export const getAllUsersProcedure = protectedProcedure.query(({ ctx }) => {
  const { db } = ctx;
  const users = db.query.users.findMany();
  return users;
});
