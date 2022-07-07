import type { NextPage } from 'next'
import Header from '../components/Header'
import Input from '../components/Input'
import Row from '../components/Row'

const guesses = [
  {
    score: 0,
    word: 'jotto'
  },
  {
    score: 1,
    word: 'jotto'
  },
  {
    score: 2,
    word: 'jotto'
  },
  {
    score: 3,
    word: 'jotto'
  },
  {
    score: 4,
    word: 'jotto'
  },
  {
    score: 5,
    word: 'jotto'
  }
]

const Home: NextPage = () => {
  return (
    <div className='w-screen max-w-sm h-screen mx-auto relative'>
      {/* Header */}
      <Header />

      {/* Score / Result header */}
      <div className='space-y-5 mx-auto flex flex-col mb-[120px]'>
        {guesses.map((guess, index) => (
          <Row key={guess.word + index} score={guess.score} word={guess.word} />
        ))}
      </div>


      {/* Input */}
      <div className='fixed left-1/2 -translate-x-1/2 z-20 bottom-[35px]'>
        <Input />
      </div>

    </div>
  )
}

export default Home
