import { useState } from 'react'
import Header from './Header'
import Writers from './Writers'
import Books from './Books'

function App() {
  const [regime, setRegime] = useState(<Books />)

  const handleBooksClick = () => {
    setRegime(<Books />)
  }

  const handleWritersClick = () => {
    setRegime(<Writers />)
  }

  return (
    <div>
      <Header booksFC={handleBooksClick} writersFC={handleWritersClick} />
      {regime}
    </div>
  )
}

export default App