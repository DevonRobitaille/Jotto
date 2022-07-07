import type { NextPage } from 'next'
import { useState } from 'react'
import Header from '../components/Header'
import Input from '../components/Input'
import Row from '../components/Row'
import { GuessList } from '../schema/guess.schema'

const Home: NextPage = () => {
  const [guesses, setGuesses] = useState<GuessList | null>(null)

  return (
    <div className='w-screen max-w-sm h-screen mx-auto relative'>
      {/* Header */}
      <Header />

      {/* Score / Result header */}
      <div className='space-y-5 mx-auto flex flex-col mb-[120px]'>
        {guesses && guesses.map((guess, index) => (
          <Row key={guess.word + index} score={guess.score} word={guess.word} correct={guess.correct} />
        ))}
      </div>


      {/* Input */}
      <Input guessList={guesses} setGuessList={setGuesses} />

    </div>
  )
}

export default Home
