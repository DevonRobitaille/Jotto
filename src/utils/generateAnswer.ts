import { words } from './words';
export const getRandomLine = (): string => {
    return words[Math.floor(Math.random() * words.length)]
}

export default getRandomLine