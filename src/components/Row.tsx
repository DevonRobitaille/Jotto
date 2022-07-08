import { NextPage } from 'next'
import { Dispatch, SetStateAction } from 'react';
import { GuessList } from '../schema/guess.schema';

interface IProps {
    guess: {
        score: number,
        word: string;
        correct: boolean;
        playerEliminated: Set<string>;
        id: string;
    }
    eliminatedList: Set<string>;
    correctList: Set<string>;
    setGuesses: Dispatch<SetStateAction<GuessList>>;
    guessList: GuessList;
    playerEliminatedList: Set<string>;
}

const Row: NextPage<IProps> = ({ guess: { id, score, word, correct, playerEliminated }, playerEliminatedList, guessList, setGuesses, eliminatedList, correctList }) => {

    const togglePlayerEliminated = (letter: string) => {
        if (playerEliminated.has(letter)) playerEliminated.delete(letter)
        else playerEliminated.add(letter)

        let guessIndex: number = guessList.map(g => g.id).indexOf(id);
        let newGuessList = guessList;
        newGuessList.splice(guessIndex, 1, {
            id,
            score,
            word,
            correct,
            playerEliminated
        })

        setGuesses((prevState) => prevState = [...newGuessList])
    }

    return (
        <div className='flex'>
            {/* Word */}
            <div className='bg-white card mx-[30px] w-[250px] flex justify-evenly p-0 m-0 g-0'>
                {word.split("").map((letter, index) => (
                    <>
                        {/* Letter */}
                        <div onClick={() => togglePlayerEliminated(letter)} key={letter + index} className={`
                        hover:cursor-pointer border-r-[3px] border-black w-full h-full capitalize text-center
                        ${playerEliminatedList.has(letter) ? " bg-[#CCC] text-[#BBB] " : ""}
                        ${playerEliminated.has(letter) ? " bg-[#CCC] text-[#BBB] " : ""}
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