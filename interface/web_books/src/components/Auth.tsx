import React, { useState, useEffect, ReactNode } from "react"
import axios from "axios"
import Cookies from "universal-cookie"

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
            .then((res) => alert(res.data))
            .catch((err) => console.log(err))

        
        cookies.set('nickname', nickname, { path: 'http://localhost:5173/' })
        cookies.set('password', password, { path: 'http://localhost:5173/' })
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
        const file = e.target.files[0]
        const reader = new FileReader()
        
        reader.onload = (event) => {
          const previewImage = document.getElementById('preview')
          previewImage.src = event.target.result
        }
        
        if (file && file.type.includes('image')) {
          reader.readAsDataURL(file);
        }
      }

    return (
        <form onSubmit={createWriter}>
            Sign up<br /><br />
            <div className="file-input-container">
                <label htmlFor="file-input" className="file-input-label">
                    <img id="preview" className="preview-image" alt="" />
                    <input type="file" id="file-input" accept="image/*" onChange={handleFileChange} />
                </label>
            </div>
            <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="Nickname" /><br />
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" /><br />
            <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="Surname" /><br />
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" /><br />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" /><br />
            <button type="submit">Send</button>
        </form>
    )
}


function Login() {
    const [nickname, setNickname] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [message, setMessage] = useState<ReactNode>(<span></span>)

    let formdata = new FormData()

    const isTrueLogin = () => {
        formdata.append("nickname", nickname)
        formdata.append("password", password)

        axios.post("http://127.0.0.1:8000/writer/check_login", formdata)
            .then((res) => {
                if (res.data) {
                    cookies.set('nickname', nickname, { path: 'http://localhost:5173/' })
                    cookies.set('password', password, { path: 'http://localhost:5173/' })
                    alert("OK")
                }
                else {
                    alert("Wrong")
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <form onSubmit={isTrueLogin}>
                Sign in<br />
                <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="Nickname" /><br />
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" /><br />
                <button type="submit">Send</button>
                {message}
            </form>
        </div>
    )
}


function Auth() {
    const [isReg, setIsReg] = useState<boolean>(true)

    const handleIsReg = () => {
        setIsReg(true)
    }

    const handleIsNotReg = () => {
        setIsReg(false)
    }

    return (
        <div id="auth">
            {isReg ? <Registration /> : <Login />}
            {isReg ? <span onClick={handleIsNotReg}>I have account</span> : <span onClick={handleIsReg}>I haven't account</span>}
        </div>
    )
}


export default Auth