import { NextPage } from 'next'
import { Dispatch, SetStateAction } from 'react';
import { GuessList } from '../schema/guess.schema';

interface IProps {
    guess: {
        score: number,
        word: string;
        correct: boolean;
        id: string;
    }
    eliminatedList: Set<string>;
    correctList: Set<string>;
    playerList: {
        eliminated: Set<string>;
        correct: Set<string>
    };
    setPlayerList: Dispatch<SetStateAction<{
        eliminated: Set<string>;
        correct: Set<string>
    }>>;

}

const Row: NextPage<IProps> = ({ guess: { id, score, word, correct }, playerList, setPlayerList, eliminatedList, correctList }) => {

    const togglePlayerList = (letter: string) => {
        if (playerList.correct.has(letter)) {
            playerList.correct.delete(letter)
        } else if (playerList.eliminated.has(letter)) {
            playerList.eliminated.delete(letter)
            playerList.correct.add(letter)
        } else playerList.eliminated.add(letter)

        setPlayerList((prevState) => {
            return {
                ...prevState,
                eliminated: playerList.eliminated,
                correct: playerList.correct
            }
        })
    }

    return (
        <div className='flex'>
            {/* Word */}
            <div className='bg-white card mx-[30px] w-[250px] flex justify-evenly p-0 m-0 g-0'>
                {word.split("").map((letter, index) => (
                    <>
                        {/* Letter */}
                        <div onClick={() => togglePlayerList(letter)} key={letter + index} className={`
                        hover:cursor-pointer border-r-[3px] border-black w-full h-full capitalize text-center
                        ${playerList.eliminated.has(letter) && !correctList.has(letter) && !eliminatedList.has(letter) ? " bg-[#CCC] text-[#BBB] " : ""}
                        ${playerList.correct.has(letter) && !correctList.has(letter) && !eliminatedList.has(letter) ? " bg-score-5 " : ""}
                        ${eliminatedList.has(letter) ? " bg-[#CCC] text-[#BBB] " : ""}
                        ${correctList.has(letter) ? " bg-score-5 " : ""}
                        ${correct ? " bg-score-5 " : ""}
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