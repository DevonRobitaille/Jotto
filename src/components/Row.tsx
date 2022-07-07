import { NextPage } from 'next'

interface IProps {
    score: number,
    word: string;
    correct: boolean;
    eliminatedChar: Set<string>;
}

const Row: NextPage<IProps> = ({ score, word, correct, eliminatedChar }) => {
    return (
        <div className='flex'>
            {/* Word */}
            <div className='bg-white card mx-[30px] w-[250px] flex justify-evenly p-0 m-0 g-0'>
                {word.split("").map((letter, index) => (
                    <>
                        {/* Letter */}
                        <div key={letter + index} className={`
                        border-r-[3px] border-black w-full h-full capitalize text-center
                        ${correct ? "bg-score-5" : ""}
                        ${eliminatedChar.has(letter.toUpperCase()) ? "bg-[#CCC] text-[#BBB]" : ""}
                        `}>
                            <p>{letter}</p>
                        </div>
                    </>
                ))}
            </div>

            {/* Score */}
            <div className={`
            card
            ${score === 5 || correct
                    ? 'bg-score-5'
                    : score === 4
                        ? 'bg-score-4'
                        : score === 3
                            ? 'bg-score-3'
                            : score === 2
                                ? 'bg-score-2'
                                : score === 1
                                    ? 'bg-score-1'
                                    : score === 0
                                        ? 'bg-score-0'
                                        : score === 4
                }
            `}>
                <p>{(correct ? "5" : score)}</p>
            </div>
        </div >
    )
}

export default Row