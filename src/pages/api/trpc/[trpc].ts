import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { NextRequest } from "next/server";
import { env } from "~/env.mjs";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

// export API handler
export default async function handler(req: NextRequest) {
  return fetchRequestHandler({
    router: appRouter,
    endpoint: `/api/trpc`,
    req,
    createContext: () => createTRPCContext(req),
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
            );
          }
        : undefined,
  });
}

export const config = {
  runtime: "edge",
  regions: ["fra1"],
};
