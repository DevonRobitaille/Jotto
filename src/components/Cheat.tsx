import { NextPage } from 'next';
import { Dispatch, SetStateAction } from 'react';

interface IProps {
    eliminatedList: Set<string>;
    correctList: Set<string>;
    playerEliminatedList: Set<string>;
    setPlayerEliminatedList: Dispatch<SetStateAction<Set<string>>>;
}

const Cheat: NextPage<IProps> = ({ eliminatedList, correctList, playerEliminatedList, setPlayerEliminatedList }) => {
    const alpha: number[] = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet: string[] = alpha.map((x) => String.fromCharCode(x));

    const togglePlayerEliminatedLetter = (letter: string) => {
        if (playerEliminatedList.has(letter)) playerEliminatedList.delete(letter)
        else if (!correctList.has(letter)) playerEliminatedList.add(letter)

        setPlayerEliminatedList((prevState) => new Set([...Array.from(playerEliminatedList)]))
    }

    return (
        <div className='grid grid-cols-5 mx-5'>
            {
                alphabet.map((char, index: number) => {
                    return (
                        <>
                            {(index === 25) && <div className='col-span-2' />}
                            <div onClick={() => togglePlayerEliminatedLetter(char)} className={`
                                card text-center hover:cursor-pointer
                                ${playerEliminatedList.has(char) ? "bg-[#CCC] text-[#BBB] " : " "}
                                ${correctList.has(char) ? " bg-score-5 " : " "}
                                ${eliminatedList.has(char) ? "bg-[#CCC] text-[#BBB] " : " "}
                            `}>{char}</div>
                        </>
                    )
                })
            }
        </div>
    )
}

export default Cheat