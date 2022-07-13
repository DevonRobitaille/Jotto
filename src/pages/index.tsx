import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Cheat from '../components/Cheat'
import Header from '../components/Header'
import Input from '../components/Input'
import Row from '../components/Row'
import { GuessList } from '../schema/guess.schema'

const Home: NextPage = () => {
  const [guesses, setGuesses] = useState<GuessList>([])
  const [eliminatedList, setEliminatedList] = useState<Set<string>>(new Set())
  const [correctList, setCorrectList] = useState<Set<string>>(new Set())
  const [showCheatPage, setShowCheatPage] = useState<boolean>(false)
  const [answer, setAnswer] = useState<string | undefined>(undefined)
  const [playerList, setPlayerList] = useState<{
    eliminated: Set<string>,
    correct: Set<string>
  }>({
    eliminated: new Set(),
    correct: new Set()
  })

  let gameOver: string | null = null;
  guesses.forEach((guess) => {
    if (guess.correct) gameOver = guess.word;
  })

  const router = useRouter()

  return (
    <>
      {
        (gameOver)
          ? (
            <>
              < Header showCheatPage={showCheatPage} setShowCheatPage={setShowCheatPage} />
              <div className='flex flex-col justify-center items-center mx-3'>
                <div className='card mt-40 flex flex-col items-center max-w-lg space-y-5 py-5'>
                  <h1 className='text-center flex-wrap text-3xl mx-10 max-w-md'>The word was <span className='font-bold text-score-0'>'{gameOver}'</span></h1>
                  <h2 className='text-center text-2xl mx-10 max-w-md'>It took <span className='font-bold text-score-0'>'{guesses.length}'</span> guesses.</h2>
                </div>
                <button onClick={() => router.reload()} className='flex mx-auto mt-10 text-4xl card bg-score-5 hover:bg-score-4'>New Game</button>
              </div>
            </>
          ) : (
            < div className='w-screen max-w-sm h-screen mx-auto relative' >
              {/* Header */}
              < Header showCheatPage={showCheatPage} setShowCheatPage={setShowCheatPage} />

              {
                showCheatPage
                  ? (
                    <Cheat eliminatedList={eliminatedList} correctList={correctList} playerList={playerList} setPlayerList={setPlayerList} />
                  ) : (
                    <>
                      {/* Score / Result header */}
                      < div className='space-y-5 mx-auto flex flex-col mb-[120px]' >
                        {guesses && guesses.map((guess, index) => (
                          <Row key={guess.word + index} guess={guess} playerList={playerList} setPlayerList={setPlayerList} eliminatedList={eliminatedList} correctList={correctList} />
                        ))
                        }
                      </div >


                      {/* Input */}
                      < Input guessList={guesses} answer={answer} setAnswer={setAnswer} setGuessList={setGuesses} eliminatedList={eliminatedList} setEliminatedList={setEliminatedList} correctList={correctList} setCorrectList={setCorrectList} playerList={playerList} setPlayerList={setPlayerList} />
                    </>
                  )
              }

            </div >
          )
      }
    </>
  )
}

export default Home
