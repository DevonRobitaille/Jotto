import {
    guessSchema,
    guessOutputSchema
} from '../../schema/guess.schema'
import getRandomLine from '../../utils/generateAnswer';
import { createRouter } from '../createRouter'

const countMatchingLetters = (s1: string, s2: string): number => {
    // Create sets
    const setS1: Set<string> = new Set([...s1.split("")]);
    const setS2: Set<string> = new Set([...s2.split("")]);

    // Convert sets to arrays
    const arrS1: string[] = Array.from(setS1);
    const arrS2: string[] = Array.from(setS2);

    // Count matches
    const count: number = arrS1.filter((char1) => arrS2.find((char2) => char1 === char2)).length

    return count;
}

export const guessRouter = createRouter()
    .mutation('guess', {
        input: guessSchema,
        output: guessOutputSchema,
        resolve({ ctx, input }) {
            // logic for counting score
            let { word, answer } = input;

            if (!answer) answer = getRandomLine().trim().slice(0, 5).toUpperCase()

            console.log(answer, word)

            const score: number = countMatchingLetters(word, answer);
            const correct = word === answer;

            // eliminated characters
            const eliminatedList: string[] = (score === 0) ? [...word.split("")] : []

            return {
                score,
                correct,
                eliminatedList,
                answer
            }
        }
    })