import { words } from './words';
export const verifyGuess = (guess: string): boolean => {
    const foundWord = words.includes(guess)
    return foundWord
}

export default verifyGuess