import { createTRPCRouter } from "~/server/api/trpc";
import { usersRouter } from "./routers/users/usersRouter";
import { postsRouter } from "./routers/posts/postsRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  users: usersRouter,
  posts: postsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
