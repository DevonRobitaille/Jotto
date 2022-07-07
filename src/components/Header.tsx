import { NextPage } from 'next'
import { QuestionMarkCircleIcon } from '@heroicons/react/outline'

interface IProps {

}

const Header: NextPage<IProps> = (props) => {
    const { } = props;
    return (
        <header className='flex items-center'>
            <div className='flex flex-1'>
                <p className='bg-black text-white font-semibold ml-8 px-8 text-4xl'>JOTTO</p>
            </div>
            <QuestionMarkCircleIcon className='h-7 mr-3 text-black hover:cursor-pointer hover:text-[#CCC]' />
        </header>
    )
}

export default Header