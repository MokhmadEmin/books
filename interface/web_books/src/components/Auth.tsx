import React, { useState, useEffect } from "react"
import axios from "axios"
import Cookies from "universal-cookie"
import pidCryptUtil from "pidcrypt/pidcrypt_util"

const cookies = new Cookies()


function Registration() {
    const [nickname, setNickname] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [surname, setSurname] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [file, setFile] = useState<File | null>(null)

    let formdata = new FormData()

    const createWriter = () => {
        formdata.append("nickname", nickname)
        formdata.append("name", name)
        formdata.append("surname", surname)
        formdata.append("icon", file)
        formdata.append("password", password)
        formdata.append("description", description)

        axios.post(`http://127.0.0.1:8000/writer/create`, formdata)
            .then(() => console.log("OK"))
            .catch((err) => console.log(err))

        
        cookies.set('nickname', pidCryptUtil.encodeBase64(nickname), { path: 'http://localhost:5173/' })
        cookies.set('password', pidCryptUtil.encodeBase64(password), { path: 'http://localhost:5173/' })
    }

    return (
        <form onSubmit={createWriter}>
            <input type="file" onChange={(e) => setDescription(e.target.files ? e.target.files[0] : null)} />
            <input type="text" value={surname} onChange={(e) => setNickname(e.target.value)} placeholder="Nickname" />
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="Surname" />
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            <button type="submit">Send</button>
        </form>
    )
}


function Login() {
    const [nickname, setNickname] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    
}