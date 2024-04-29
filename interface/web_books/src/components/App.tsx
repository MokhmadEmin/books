import { useState, ReactNode } from 'react'
import Header from './Header'
import Writers from './Writers'
import Books from './Books'
import Auth from './Auth'
import CreateBook from './CreateBook'

function App() {
  const [regime, setRegime] = useState<ReactNode>(<Books />)

  const handleBooksClick = () => {
    setRegime(<Books />)
  }

  const handleWritersClick = () => {
    setRegime(<Writers />)
  }

  const handleAuthClick = () => {
    setRegime(<Auth />)
  }

  const handleCreateClick = () => {
    setRegime(<CreateBook />)
  }

  return (
    <div>
      <Header booksFC={handleBooksClick} writersFC={handleWritersClick} authFC={handleAuthClick} createFC={handleCreateClick} />
      {regime}
    </div>
  )
}

export default App