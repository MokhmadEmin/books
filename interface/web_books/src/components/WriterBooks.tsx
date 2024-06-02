import { useState, useEffect } from "react"
import axios from "axios"
import Reading from "./Reading"


interface Book {
    id: number
    author_id: number
    name: string
    description: string
    text: string
}

type WriterBooksProps = {
    id: number
}

function WriterBooks(props: WriterBooksProps) {
    const [booksList, setBooksList] = useState<Book[]>([])
    const [reading, setReading] = useState<boolean>(false)
    const [needReadingId, setNeedReadingId] = useState<number>(0)

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/writer/${props.id}/books`)
            .then((res) => setBooksList(res.data))
            .catch((err) => console.log(err))
    }, [])


    const handleSetReading = (id: number) => {
        setReading(!reading)
        setNeedReadingId(id)
    }

    return (
        <div className="writers_books_list">
            {booksList.map((book: Book, index: number) => (
                <div id="writer_book" onClick={() => handleSetReading(book.id)} key={book.id}>
                    <h1>{book.name}</h1>
                    <h4>{<BookAuthor id={book.author_id} />}</h4>
                    {book.description}
                    {index !== booksList.length - 1 ? <hr /> : ""}
                </div>
            ))}
            {needReadingId ? <Reading id={needReadingId} state={reading} closeFunc={() => setReading(false)} /> : ""}
        </div>
    )
}


type IdNeedProps = {
    id: number
}

function BookAuthor(props: IdNeedProps) {
    const url: string = `http://127.0.0.1:8000/book/${props.id}/author`

    const [bookAuthor, setBookAuthor] = useState<string>("")

    useEffect(() => {
        axios.get(url)
            .then((res) => setBookAuthor(res.data))
            .catch((err) => console.log(err))
    }, [])


    return <div>{bookAuthor}</div>
}


export default WriterBooks