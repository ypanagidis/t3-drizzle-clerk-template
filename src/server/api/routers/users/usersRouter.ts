import { createTRPCRouter } from "~/server/api/trpc";
import { getAllUsersProcedure } from "./getAll";

export const usersRouter = createTRPCRouter({
  getAll: getAllUsersProcedure,
});
