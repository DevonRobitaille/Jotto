import { words } from './words';
export const verifyGuess = (guess: string): boolean => {
    console.log(words)
    const foundWord: boolean = words.includes(guess.toLowerCase())
    console.log(guess, foundWord)
    return foundWord
}

export default verifyGuess