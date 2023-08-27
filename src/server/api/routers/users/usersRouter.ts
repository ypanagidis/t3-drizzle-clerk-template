import { createTRPCRouter } from "~/server/api/trpc";
import { getAllUsersProcedure } from "./getAll";
import { addUserProcedure } from "./addUser";
import { getUserByLimitAndPageProcedure } from "./getUserByLimitAndPageProcedure";
import { deleteUserProcedure } from "./deleteUserProcedure";

export const usersRouter = createTRPCRouter({
  getAll: getAllUsersProcedure,
  addUser: addUserProcedure,
  getUserByLimitAndPage: getUserByLimitAndPageProcedure,
  deleteUser: deleteUserProcedure,
});
