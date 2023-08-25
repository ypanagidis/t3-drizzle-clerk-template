import type { AppRouter } from "~/server/api/root";
import type { inferRouterOutputs } from "@trpc/server";

//Helper funcs
export type RouterOutputs = inferRouterOutputs<AppRouter>;
export type GetArrayMemeber<T> = T extends Array<infer P> ? P : never;

export type AllUsers = RouterOutputs["users"]["getAll"];
export type UserFromAllUsers = GetArrayMemeber<AllUsers>;
