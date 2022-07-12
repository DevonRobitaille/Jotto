import { NextPage } from 'next';
import { Dispatch, SetStateAction } from 'react';

interface IProps {
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

const Cheat: NextPage<IProps> = ({ eliminatedList, correctList, playerList, setPlayerList }) => {
    const alpha: number[] = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet: string[] = alpha.map((x) => String.fromCharCode(x));

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
        <div className='grid grid-cols-5 mx-5'>
            {
                alphabet.map((letter, index: number) => {
                    return (
                        <>
                            {(index === 25) && <div className='col-span-2' />}
                            <div onClick={() => togglePlayerList(letter)} className={`
                                card text-center hover:cursor-pointer
                               ${playerList.eliminated.has(letter) && !correctList.has(letter) && !eliminatedList.has(letter) ? " bg-[#CCC] text-[#BBB] " : ""}
                                ${playerList.correct.has(letter) && !correctList.has(letter) && !eliminatedList.has(letter) ? " bg-score-5 " : ""}
                                ${eliminatedList.has(letter) ? " bg-[#CCC] text-[#BBB] " : ""}
                                ${correctList.has(letter) ? " bg-score-5 " : ""}
                            `}>{letter}</div>
                        </>
                    )
                })
            }
        </div>
    )
}

export default Cheat