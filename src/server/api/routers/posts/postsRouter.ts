import { createTRPCRouter } from "../../trpc";
import { getAll } from "./getAll";

export const postsRouter = createTRPCRouter({
  getAllByUser: getAll,
});
