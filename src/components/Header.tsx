import { NextPage } from 'next'
import { QuestionMarkCircleIcon } from '@heroicons/react/outline'
import { Dispatch, SetStateAction } from 'react';

interface IProps {
    showCheatPage: boolean;
    setShowCheatPage: Dispatch<SetStateAction<boolean>>;
}

const Header: NextPage<IProps> = ({ showCheatPage, setShowCheatPage }) => {
    return (
        <header className='flex items-center mb-[30px]'>
            <div className='flex flex-1'>
                <p className='bg-black text-white font-semibold ml-8 px-8 text-4xl'>JOTTO</p>
            </div>
            <QuestionMarkCircleIcon onClick={() => setShowCheatPage(!showCheatPage)} className='h-7 mr-3 text-black hover:cursor-pointer hover:text-[#CCC]' />
        </header>
    )
}

export default Header