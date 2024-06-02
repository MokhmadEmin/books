import { useState, useEffect } from "react"
import axios from "axios"
import Cookies from "universal-cookie"

const cookies = new Cookies()

function CreateBook() {
    const [author, setAuthor] = useState<number>(0)
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [file, setFile] = useState<File | null>(null)
    const [text, setText] = useState<File | null>(null)

    let formdata = new FormData()

    useEffect(() => {
      axios.get(`http://127.0.0.1:8000/writer/get_id/${cookies.get("nickname")}`)
        .then((res) => setAuthor(res.data))
        .catch((err) => console.log(err))
    }, [])

    const CreateFC = () => {
        formdata.append("author", author)
        formdata.append("name", name)
        formdata.append("description", description)
        formdata.append("icon", file)
        formdata.append("text", text)

        axios.post("http://127.0.0.1:8000/book/create", formdata)
            .then(() => alert("OK"))
            .catch((err) => alert(err))
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
    <form id="create-book-form" onSubmit={CreateFC}>
        Create book<br /><br />
        <div className="file-input-container">
            <label htmlFor="file-input" className="file-input-label">
                <img id="preview" className="preview-image" />
                <input type="file" id="file-input" accept="image/*" onChange={handleFileChange} />
            </label>
        </div><br />
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" /><br />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" /><br />
        <input type="file" accept=".doc, .docx" onChange={(e) => setText(e.target.files[0])} /><br />
        <button type="submit">Send</button>
    </form>
    )
}

export default CreateBook