import { publicProcedure } from "../../trpc";

export const getAllUsersProcedure = publicProcedure.query(({ ctx }) => {
  const { db } = ctx;
  const users = db.query.users.findMany();
  return users;
});
