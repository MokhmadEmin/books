import React, { useState, useEffect } from "react"
import axios from 'axios'

interface Writer {
    id: number,
    nickname: string,
    name: string
    surname: string
    password: string
    description: string
}

function Writers() {
    const [writersList, setWritersList] = useState<Writer[]>([])

    useEffect(() => { 
        axios.get("http://127.0.0.1:8000/writer/all")
            .then((res) => setWritersList(res.data))
            .catch((err) => console.log(err))
    }, [])

    return (
        <div className="writer_list">
            {writersList.map((writer: Writer) => (
                <div className="writer" key={writer.id}>
                    <WriterIcon id={writer.id} />
                    <h1>{writer.name} {writer.surname}</h1>
                    <h3>@{writer.nickname}</h3>
                    <h5>{writer.description}</h5>
                </div>
            ))}
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

export default Writers
