import { NextPage } from 'next';

interface IProps {
    eliminatedChar: Set<string>;
}

const Cheat: NextPage<IProps> = ({ eliminatedChar }) => {
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
                                ${eliminatedChar.has(char) ? "bg-[#CCC] text-[#BBB] " : "bg-white text-black "}
                            `}>{char}</div>
                        </>
                    )
                })
            }
        </div>
    )
}

export default Cheat