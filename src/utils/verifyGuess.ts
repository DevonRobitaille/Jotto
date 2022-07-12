import { words } from './words';
export const verifyGuess = (guess: string): boolean => {
    const foundWord: boolean = words.includes(guess.toLowerCase())
    return foundWord
}

export default verifyGuess