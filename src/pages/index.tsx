import type { NextPage } from 'next'
import { useState } from 'react'
import Cheat from '../components/Cheat'
import Header from '../components/Header'
import Input from '../components/Input'
import Row from '../components/Row'
import { GuessList } from '../schema/guess.schema'

const Home: NextPage = () => {
  const [guesses, setGuesses] = useState<GuessList | null>(null)
  const [eliminatedChar, setEliminatedChar] = useState<Set<string>>(new Set())
  const [showCheatPage, setShowCheatPage] = useState<boolean>(false)

  return (
    <div className='w-screen max-w-sm h-screen mx-auto relative'>
      {/* Header */}
      <Header showCheatPage={showCheatPage} setShowCheatPage={setShowCheatPage} />

      {showCheatPage
        ? (
          <Cheat eliminatedChar={eliminatedChar} />
        ) : (
          <>
            {/* Score / Result header */}
            < div className='space-y-5 mx-auto flex flex-col mb-[120px]'>
              {guesses && guesses.map((guess, index) => (
                <Row key={guess.word + index} score={guess.score} word={guess.word} correct={guess.correct} eliminatedChar={eliminatedChar} />
              ))}
            </div>


            {/* Input */}
            <Input guessList={guesses} setGuessList={setGuesses} eliminatedChar={eliminatedChar} setEliminatedChar={setEliminatedChar} />
          </>
        )
      }

    </div >
  )
}

export default Home
