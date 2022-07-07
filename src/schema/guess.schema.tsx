import * as z from 'zod'

const wordRegex = new RegExp('^[a-zA-Z]{5}$')

export const guessSchema = z.object({
    word: z.string().regex(wordRegex)
})

export type Guess = z.TypeOf<typeof guessSchema>

export const guessListSchema = z.object({
    word: z.string().regex(wordRegex),
    score: z.number().lte(5).gte(0),
    correct: z.boolean()
}).array()

export type GuessList = z.TypeOf<typeof guessListSchema>