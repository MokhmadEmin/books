import { useState, useEffect } from "react"
import axios from "axios"
import Cookies from "universal-cookie"

const cookies = new Cookies()

interface ProfileData {
    id: number
    nickname: string
    name: string
    surname: string
    password: string
    description: string
}

let default_data: ProfileData = {
    id: 1,
    nickname: "default",
    name: "default",
    surname: "default",
    password: "default",
    description: "default"
}

function Profile() {
    const [data, setData] = useState<ProfileData>(default_data)

    let formdata = new FormData()

    useEffect(() => {
        formdata.append("nickname", cookies.get("nickname"))
        formdata.append("password", cookies.get("password"))

        axios.post("http://127.0.0.1:8000/writer/profile", formdata)
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => console.lo)
        }, [])

    return (
        <div id="profile">
            <WriterIcon id={data.id} />
            <h1>{data.name} {data.surname}</h1>
            <h2>@{data.nickname}</h2>
            <h3><b>{data.description}</b></h3>
        </div>
    )
}

type WriterIconProps = {
    id: number
}

function WriterIcon(props: WriterIconProps) {
    const url: string = `http://127.0.0.1:8000/writer/${props.id}/icon`

    return <div><img src={url} alt="404" /></div>
}

export default Profile