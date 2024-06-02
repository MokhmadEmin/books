import { useState } from 'react'
import axios from 'axios'
import Cookies from "universal-cookie"

import profile from '../../assets/profile-circle.svg'

const cookies = new Cookies()


type HeaderProps = {
  booksFC: void
  writersFC: void
  authFC: void
  createFC: void
  profileFC: void
}


function Header(props: HeaderProps) {
  return (
    <div>
      <header>
        <span onClick={props.createFC}>create book</span>
        <span onClick={props.booksFC}>books</span>
        <b>Books</b>
        <span onClick={props.writersFC}>writers</span>
        <span onClick={props.authFC}>sign up/in</span>
        <div onClick={props.profileFC}><UserIcon /></div>
      </header>
    </div>
  )
}


function UserIcon() {
  const [id, setId] = useState<number>(0)

  axios.get(`http://127.0.0.1:8000/writer/get_id/${cookies.get("nickname")}`)
    .then((res) => setId(res.data))
    .catch((err) => console.log(err))


  console.log(id)

  const url: string = `http://127.0.0.1:8000/writer/${id}/icon`

  console.log(url)

  return <>{cookies.get("nickname") === "" || cookies.get("password") === "" ?
  "404" : 
  <img id="user_icon" src={url} alt="404" />
  }</>
}


export default Header
