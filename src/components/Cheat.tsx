import { NextPage } from 'next';

interface IProps {
    eliminatedList: Set<string>;
    correctList: Set<string>;
}

const Cheat: NextPage<IProps> = ({ eliminatedList, correctList }) => {
    const alpha: number[] = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet: string[] = alpha.map((x) => String.fromCharCode(x));

    return (
        <div className='grid grid-cols-5 mx-5'>
            {
                alphabet.map((char, index: number) => {
                    return (
                        <>
                            {(index === 25) && <div className='col-span-2' />}
                            <div className={`
                                card text-center
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