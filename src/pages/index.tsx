import type { NextPage } from 'next'
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
  const [playerEliminatedList, setPlayerEliminatedList] = useState<Set<string>>(new Set())

  let gameOver: string | null = null;
  guesses.forEach((guess) => {
    if (guess.correct) gameOver = guess.word;
  })

  return (
    <>
      {
        (gameOver)
          ? (
            <>
              < Header showCheatPage={showCheatPage} setShowCheatPage={setShowCheatPage} />
              <div>
                <h1 className='text-center text-3xl mt-40'>The word was <span className='font-bold text-score-0'>'{gameOver}'</span></h1>
              </div>
            </>
          ) : (
            < div className='w-screen max-w-sm h-screen mx-auto relative' >
              {/* Header */}
              < Header showCheatPage={showCheatPage} setShowCheatPage={setShowCheatPage} />

              {
                showCheatPage
                  ? (
                    <Cheat eliminatedList={eliminatedList} correctList={correctList} playerEliminatedList={playerEliminatedList} setPlayerEliminatedList={setPlayerEliminatedList} />
                  ) : (
                    <>
                      {/* Score / Result header */}
                      < div className='space-y-5 mx-auto flex flex-col mb-[120px]' >
                        {guesses && guesses.map((guess, index) => (
                          <Row playerEliminatedList={playerEliminatedList} key={guess.word + index} guess={guess} guessList={guesses} setGuesses={setGuesses} eliminatedList={eliminatedList} correctList={correctList} />
                        ))
                        }
                      </div >


                      {/* Input */}
                      < Input playerEliminatedList={playerEliminatedList} setPlayerEliminatedList={setPlayerEliminatedList} guessList={guesses} answer={answer} setAnswer={setAnswer} setGuessList={setGuesses} eliminatedList={eliminatedList} setEliminatedList={setEliminatedList} correctList={correctList} setCorrectList={setCorrectList} />
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
