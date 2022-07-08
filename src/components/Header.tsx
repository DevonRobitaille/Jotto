import { NextPage } from 'next'
import { ExclamationCircleIcon, PlusIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline'
import { Dispatch, SetStateAction } from 'react';
import { UncontrolledTooltip } from "reactstrap";
import { useRouter } from 'next/router';

interface IProps {
    showCheatPage: boolean;
    setShowCheatPage: Dispatch<SetStateAction<boolean>>;
}

const Header: NextPage<IProps> = ({ showCheatPage, setShowCheatPage }) => {
    const router = useRouter()
    const newGame = () => {
        router.reload()
    }

    return (
        <header className='flex items-center mb-[30px]'>
            <div className='flex flex-1'>
                <p className='bg-black text-white font-semibold ml-8 px-8 text-4xl'>JOTTO</p>
            </div>

            {/* New Game */}
            <p id="TooltipNewGame">
                <PlusIcon onClick={() => newGame()} className='h-7 mr-3 text-black hover:cursor-pointer hover:text-[#CCC]' />
            </p>
            <UncontrolledTooltip
                target="TooltipNewGame"
                placement="bottom"
                delay={500}
            >
                <p className='bg-black text-white border-2 border-white mr-2 mt-1 px-2 py-1 rounded-full text-sm items-center flex'>
                    <ExclamationCircleIcon className='h-4 mr-1 text-score-1' />
                    Start a new game.
                </p>
            </UncontrolledTooltip>

            {/* Cheat Page */}
            <p id="TooltipCheatPage">
                <QuestionMarkCircleIcon onClick={() => setShowCheatPage(!showCheatPage)} className='h-7 mr-3 text-black hover:cursor-pointer hover:text-[#CCC]' />
            </p>
            <UncontrolledTooltip
                target="TooltipCheatPage"
                placement="bottom"
                delay={500}
            >
                <p className='bg-black text-white border-2 border-white mr-2 mt-1 px-2 py-1 rounded-full text-sm items-center flex'>
                    <ExclamationCircleIcon className='h-4 mr-1 text-score-1' />
                    See Eliminated Letters
                </p>
            </UncontrolledTooltip>
        </header>
    )
}

export default Header