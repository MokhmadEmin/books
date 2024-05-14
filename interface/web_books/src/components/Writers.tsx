import React, { useState, useEffect } from "react"
import axios from 'axios'
import WriterBooks from "./WriterBooks"

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
    const [writerBooks, setWriterBooks] = useState<boolean>(false)
    const [needWriterBooksId, setNeedWriterBooksId] = useState<number>(0)

    useEffect(() => { 
        axios.get("http://127.0.0.1:8000/writer/all")
            .then((res) => setWritersList(res.data))
            .catch((err) => console.log(err))
    }, [])

    const handleWriterBooks = (id: number) => {
        setWriterBooks(!writerBooks)
        setNeedWriterBooksId(id)
    }

    return (
        <div className="writer_list">
            {writersList.map((writer: Writer) => (
                <div className="writer" key={writer.id} onClick={() => handleWriterBooks(writer.id)}>
                    <WriterIcon id={writer.id} />
                    <h1>{writer.name} {writer.surname}</h1>
                    <h3>@{writer.nickname}</h3>
                    <h5>{writer.description}</h5>
                </div>
            ))}
            {writerBooks ? <WriterBooks id={needWriterBooksId} /> : ""}
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
