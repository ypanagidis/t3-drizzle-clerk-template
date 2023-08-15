import { createTRPCRouter } from "~/server/api/trpc";
import { getAllUsersProcedure } from "./getAll";
import { addUserProcedure } from "./addUser";

export const usersRouter = createTRPCRouter({
  getAll: getAllUsersProcedure,
  addUser: addUserProcedure,
});
