/*
    This file contains the appRouter which is used to merge all other
    routers (also known as trcp endpoints) into one file.
    Attached as type definitions to:
    /src/pages/_app.tsx (export default withTRPC<appRouter>...)
    /src/utils/trpc.ts (line 4 - export const trpc = createReactQueryHooks<appRouter>())
*/

import { createRouter } from "../createRouter";
import { guessRouter } from "./guess.router";

export const appRouter = createRouter()
    .merge('guess.', guessRouter)

export type AppRouter = typeof appRouter