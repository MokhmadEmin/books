import React, { useState, useEffect } from "react"
import axios from 'axios'
import Reading from './Reading'


interface Book {
    id: number
    author_id: number
    name: string
    description: string
    text: string
}

function Books() {
    const [booksList, setBooksList] = useState<Book[]>([])
    const [reading, setReading] = useState<boolean>(false)
    const [needReadingId, setNeedReadingId] = useState<number>(0)

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/book/all")
            .then((res) => setBooksList(res.data))
            .catch((err) => console.log(err))
    }, [])

    const handleSetReading = (id: number) => {
        setReading(!reading)
        setNeedReadingId(id)
    }

    return (
        <div className="book_list">
            {booksList.map((book: Book) => (
                <div onClick={() => handleSetReading(book.id)} className="book" key={book.id}>
                    <BookCover id={book.id}/>
                    <h1>{book.name}</h1>
                    <h3><BookAuthor id={book.author_id} /></h3>
                    <h5>{book.description}</h5>
                </div>
            ))}
            {needReadingId ? <Reading id={needReadingId} state={reading} closeFunc={() => setReading(false)} /> : ""}
        </div>
    )
}

type IdNeedProps = {
    id: number
}

function BookCover(props: IdNeedProps) {
    const url: string = `http://127.0.0.1:8000/book/${props.id}/icon`

    return <div><img src={url} alt="404" /></div>
}

function BookAuthor(props: IdNeedProps) {
    const url: string = `http://127.0.0.1:8000/book/${props.id}/author`

    const [bookAuthor, setBookAuthor] = useState<string>("")

    useEffect(() => {
        axios.get(url)
            .then((res) => setBookAuthor(res.data))
            .catch((err) => console.log(err))
    })


    return <div>{bookAuthor}</div>
}


export default Books