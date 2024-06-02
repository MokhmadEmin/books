import { useState, useEffect, ReactNode } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'

import Header from './Header'
import Writers from './Writers'
import Books from './Books'
import Auth from './Auth'
import CreateBook from './CreateBook'
import Profile from './Profile'

const cookies = new Cookies()

function App() {
  const [regime, setRegime] = useState<ReactNode>(<Books />)

  useEffect(() => {
    let formdata = new FormData()

    if (cookies.get("nickname") === "" || cookies.get("password") === "") {
      setRegime(<Auth />)
    }
    else {
      formdata.append("nickname", cookies.get("nickname"))
      formdata.append("password", cookies.get("password"))
  
      axios.post("http://127.0.0.1:8000/writer/check_login", formdata)
          .then((res) => {
              if (res.data || cookies.get("nickname")) {
                setRegime(regime)
              }
              else {
                setRegime(<Auth />)
              }
          })
          .catch((err) => console.log(err))
    }
  }, [])

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

  const handleProfileClick = () => {
    setRegime(<Profile />)
  }

  return (
    <div>
      <Header booksFC={handleBooksClick} writersFC={handleWritersClick} authFC={handleAuthClick} createFC={handleCreateClick} profileFC={handleProfileClick} />
      {regime}
    </div>
  )
}

export default App