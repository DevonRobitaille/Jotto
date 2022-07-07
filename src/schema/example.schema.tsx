import * as z from 'zod'

export const exampleSchema = z.object({
})

export type example = z.TypeOf<typeof exampleSchema>