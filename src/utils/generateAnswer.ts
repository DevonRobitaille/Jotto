import * as fs from 'fs';
const fileName = './public/words5.txt'
export const getRandomLine = (): string => {
    const file = fs.readFileSync(fileName, 'utf-8')

    if (file) {
        const lines = file.split('\n');
        const answer: string = lines[Math.floor(Math.random() * lines.length)]
        return answer;
    }

    return "JOTTO"
}

export default getRandomLine