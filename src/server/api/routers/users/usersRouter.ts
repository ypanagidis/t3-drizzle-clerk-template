import { createTRPCRouter } from "~/server/api/trpc";
import { getAllUsersProcedure } from "./getAll";
import { addUserProcedure } from "./addUser";
import { getUserByLimitAndPageProcedure } from "./getUserByLimitAndPageProcedure";

export const usersRouter = createTRPCRouter({
  getAll: getAllUsersProcedure,
  addUser: addUserProcedure,
  getUserByLimitAndPage: getUserByLimitAndPageProcedure,
});
