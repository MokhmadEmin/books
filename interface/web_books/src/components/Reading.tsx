import React, { useState, useEffect } from "react"
import axios from 'axios'

type ReadingProps = {
    id: number
    state: boolean
    closeFunc: void
}

function Reading(props: ReadingProps) {
    const [text, setText] = useState<string>("")
    const [page_index, setPageIndex] = useState<number>(0)

    const itemsPerPage: number = 2000;
    const symbolsQuantity: number = text.length

    const pagesQuantity: number = Math.ceil(symbolsQuantity / itemsPerPage)

    const pages: string[] = paginator(text, itemsPerPage)

    const handleNextPage = () => {
        setPageIndex(page_index + 1)
    }

    const handleLastPage = () => {
        setPageIndex(page_index - 1)
    }

    const lastPageButtonStyle: Record = page_index === 0 ? {backgroundColor: "#701515"} : {}
    const nextPageButtonStyle: Record = page_index === pagesQuantity - 1 ? {backgroundColor: "#701515"} : {}

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/book/${props.id}/text`)
            .then((res) => setText(res.data))
            .catch((err) => console.log(err))
    })

    return (
        <div>
            {props.state ? <div className="reading">
                <span id="close" onClick={props.closeFunc}>✖️</span>
                <div dangerouslySetInnerHTML={{ __html: pages[page_index] }} />
                <button onClick={handleLastPage} disabled={page_index === 0} style={lastPageButtonStyle}>&#8592;</button>
                <button onClick={handleNextPage} disabled={page_index === pagesQuantity - 1} style={nextPageButtonStyle}>&#8594;</button>
                <span id="page_index">{`${page_index + 1}|${pagesQuantity}`}</span>
            </div> : ""}
        </div>
    )
}

function paginator(str: string, size: number): string[] {
    const chunks: string[] = [];
    for (let i = 0; i < str.length; i += size) {
        chunks.push(str.substring(i, i + size));
    }
    return chunks;
}

export default Reading