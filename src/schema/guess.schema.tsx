import * as z from 'zod'

const wordRegex = new RegExp('^[a-zA-Z]{5}$')

export const guessSchema = z.object({
    word: z.string().regex(wordRegex),
    answer: z.string().regex(wordRegex).optional()
})

export type Guess = z.TypeOf<typeof guessSchema>

export const guessListSchema = z.object({
    word: z.string().regex(wordRegex),
    score: z.number().lte(5).gte(0),
    correct: z.boolean()
}).array()

export type GuessList = z.TypeOf<typeof guessListSchema>

export const guessOutputSchema = z.object({
    score: z.number().lte(5).gte(0),
    correct: z.boolean(),
    answer: z.string().length(5),
})

export type guessOutput = z.TypeOf<typeof guessOutputSchema>