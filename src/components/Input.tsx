import { NextPage } from 'next'
import { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form'
import { GuessList } from '../schema/guess.schema';
import { trpc } from '../utils/trpc';

interface IProps {
    guessList: GuessList | null;
    setGuessList: Dispatch<SetStateAction<GuessList | null>>;
    eliminatedList: Set<string>;
    setEliminatedList: Dispatch<SetStateAction<Set<string>>>;
    answer?: string;
    setAnswer: Dispatch<SetStateAction<string | undefined>>;
    correctList: Set<string>;
    setCorrectList: Dispatch<SetStateAction<Set<string>>>;
}

interface IForm {
    word: string
}

const Input: NextPage<IProps> = (props) => {
    const { handleSubmit, register, reset } = useForm<IForm>()
    const { guessList, setGuessList, eliminatedList, setEliminatedList, answer, setAnswer, correctList, setCorrectList } = props;
    const mutation = trpc.useMutation(['guess.guess'])

    const alpha: number[] = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet: string[] = alpha.map((x) => String.fromCharCode(x));

    const onSubmit: SubmitHandler<IForm> = async (data) => {
        const result = mutation.mutate({ word: data.word.toUpperCase(), answer }, {
            onSuccess: (res) => {
                const word = data.word.toUpperCase()

                const newGuessList = (guessList)
                    ? [...guessList, {
                        word: word,
                        score: res.score,
                        correct: res.correct
                    }] : [{
                        word: word,
                        score: res.score,
                        correct: res.correct
                    }];

                let newEliminatedList: Set<string> = eliminatedList;
                res.eliminatedList.forEach((char: string) => newEliminatedList.add(char))

                // Update Guess List
                setGuessList((prevState) => prevState = newGuessList)

                // Update Correct List
                let newCorrectList: Set<string> = correctList;

                while (true) {
                    // Step 1 - Update Correct List
                    const tmpCorrectList: Set<string> = newCorrectList;
                    newGuessList.forEach((guess, index) => {
                        if (guess.score !== 0) {
                            let score: number = guess.score;
                            let chars: string[] = Array.from(new Set([...guess.word.split("")]));

                            const remainingLetters: string[] = chars.filter((char) => !newEliminatedList.has(char))

                            if (score === remainingLetters.length) remainingLetters.forEach((char) => tmpCorrectList.add(char))
                        }
                    })

                    // Step 2 - Update Eliminated List
                    const tmpEliminatedList: Set<string> = newEliminatedList;
                    newGuessList.forEach((guess, index) => {
                        if (guess.score !== 0 && guess.score !== 5) {
                            let score: number = guess.score;
                            let chars: string[] = Array.from(new Set([...guess.word.split("")]));

                            const remainingLetters: string[] = chars.filter((char) => !tmpCorrectList.has(char))

                            if (chars.length - remainingLetters.length === score) remainingLetters.forEach((char) => tmpEliminatedList.add(char))
                        }
                    })

                    // Step 3 - See if difference between two words is equal

                    // Break or not?
                    if (tmpCorrectList === newCorrectList && tmpEliminatedList === newEliminatedList) {
                        // console.log("------")
                        // console.log(newCorrectList, tmpCorrectList)
                        // console.log(tmpEliminatedList, newEliminatedList)
                        newCorrectList = tmpCorrectList;
                        newEliminatedList = tmpEliminatedList;
                        break;
                    }
                    newCorrectList = tmpCorrectList;
                    newEliminatedList = tmpEliminatedList;
                }

                // if correctList length is 5 (aka maxiumum letters found) eliminate all other letters
                if (newCorrectList.size === 5) newEliminatedList = new Set([...alphabet].filter(char => !newCorrectList.has(char)));

                // Update Eliminated List
                setEliminatedList((prevState) => prevState = newEliminatedList)

                // Save Answer
                setAnswer((prevState) => prevState = res.answer)

                // Update Correct List
                setCorrectList((prevState) => prevState = newCorrectList)
            }
        })

        reset()
    }

    return (
        <div className='fixed left-1/2 -translate-x-1/2 z-20 bottom-[35px]'>
            <div className='flex items-center'>
                <form onSubmit={handleSubmit(onSubmit)} className='flex space-x-5'>
                    <input autoComplete="off" {...register('word')} className='card w-[180px] text-center uppercase' placeholder="jotto" />
                    <button className='card bg-score-5 hover:bg-score-3 focus:bg-score-4'>Guess</button>
                </form>
            </div>
        </div>
    )
}

export default Input