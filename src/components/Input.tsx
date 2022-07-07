import { NextPage } from 'next'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IProps {
}

interface IForm {
    word: string
}

const Input: NextPage<IProps> = () => {
    const { handleSubmit, register, reset } = useForm<IForm>()

    // jotai hooks


    const onSubmit: SubmitHandler<IForm> = async (data) => {
        reset()
    }

    return (
        <div className='flex items-center'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex space-x-5'>
                <input {...register('word')} className='card w-[180px] text-center uppercase' placeholder="jotto" />
                <button className='card bg-score-5 hover:bg-score-3 focus:bg-score-4'>Guess</button>
            </form>
        </div>
    )
}

export default Input