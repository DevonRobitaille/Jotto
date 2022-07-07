import * as z from 'zod'

export const guessSchema = z.object({
    word: z.string().length(5)
})

export type Guess = z.TypeOf<typeof guessSchema>

export const guessListSchema = z.object({
    word: z.string().length(5),
    score: z.number().lte(5).gte(0),
    correct: z.boolean()
}).array()

export type GuessList = z.TypeOf<typeof guessListSchema>