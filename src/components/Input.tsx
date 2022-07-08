import { NextPage } from 'next'
import { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form'
import { GuessList } from '../schema/guess.schema';
import { trpc } from '../utils/trpc';

interface IProps {
    guessList: GuessList | null;
    setGuessList: Dispatch<SetStateAction<GuessList | null>>;
    eliminatedChar: Set<string> | null;
    setEliminatedChar: Dispatch<SetStateAction<Set<string>>>;
    answer?: string;
    setAnswer: Dispatch<SetStateAction<string | undefined>>;
    correctChar: Set<string> | null;
    setCorrectChar: Dispatch<SetStateAction<Set<string>>>;
}

interface IForm {
    word: string
}

const Input: NextPage<IProps> = (props) => {
    const { handleSubmit, register, reset } = useForm<IForm>()
    const { guessList, setGuessList, eliminatedChar, setEliminatedChar, answer, setAnswer, correctChar, setCorrectChar } = props;
    const mutation = trpc.useMutation(['guess.guess'])

    const onSubmit: SubmitHandler<IForm> = async (data) => {
        const result = mutation.mutate({ word: data.word.toUpperCase(), answer }, {
            onSuccess: (res) => {
                // Update Guess List
                setGuessList((prevState) => prevState = (prevState) ? [...prevState, {
                    word: data.word,
                    score: res.score,
                    correct: res.correct
                }] : [{
                    word: data.word,
                    score: res.score,
                    correct: res.correct
                }])

                // Update Eliminated List
                setEliminatedChar((prevState) => {
                    res.eliminatedChar.forEach((char: string) => prevState.add(char))
                    return prevState
                })

                // // Updated Correct List
                // let resultSet: Set<string> = new Set()
                // guessList?.forEach((guess) => {
                //     let score: number = guess.score;
                //     let chars: string[] = guess.word.split("");

                //     const remaining = chars.filter((char) => !eliminatedChar?.has(char))

                //     console.log(remaining)
                // })

                // console.log(res.answer, res.eliminatedChar)
                // Save Answer
                setAnswer((prevState) => prevState = res.answer)
            }
        })

        reset()
    }

    return (
        <div className='fixed left-1/2 -translate-x-1/2 z-20 bottom-[35px]'>
            <div className='flex items-center'>
                <form onSubmit={handleSubmit(onSubmit)} className='flex space-x-5'>
                    <input {...register('word')} className='card w-[180px] text-center uppercase' placeholder="jotto" />
                    <button className='card bg-score-5 hover:bg-score-3 focus:bg-score-4'>Guess</button>
                </form>
            </div>
        </div>
    )
}

export default Input