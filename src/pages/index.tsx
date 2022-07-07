import type { NextPage } from 'next'
import Header from '../components/Header'
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
    <div className='w-screen max-w-7xl h-screen mx-auto'>
      {/* Header */}
      <Header />

      {/* Score / Result header */}
      <div className='space-y-5'>
        {guesses.map((guess, index) => (
          <Row key={guess.word + index} score={guess.score} word={guess.word} />
        ))}
      </div>


      {/* Input */}


    </div>
  )
}

export default Home
