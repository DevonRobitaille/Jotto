/*
    This file contains the context (ctx) variable that will be passed
    between the different endpoints of trpc to grab the request, response,
    prisma, and user objects
    Attached as type definitions to:
    /src/server/createRouter.ts (for line 7 - return router...)
*/

import { NextApiRequest, NextApiResponse } from 'next'

export function createContext({
    req,
    res,
}: {
    req: NextApiRequest
    res: NextApiResponse
}) {

    return { req, res }
}

export type Context = ReturnType<typeof createContext>