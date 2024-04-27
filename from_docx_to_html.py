from docx import Document
from fastapi import UploadFile

import os


async def from_docx_to_html(file: UploadFile) -> str:
    html_content = ""

    with open(file.filename, "wb") as file_object:
        file_object.write(file.file.read())

    doc = Document(file.filename)

    os.remove(file.filename)

    for paragraph in doc.paragraphs:
        html_paragraph = "<p>"
        for run in paragraph.runs:
            text = run.text
            if run.bold:
                text = f"<b>{text}</b>"
            if run.italic:
                text = f"<i>{text}</i>"
            if run.underline:
                text = f"<u>{text}</u>"
            html_paragraph += text

        html_paragraph += "</p><br>"
        html_content += html_paragraph

    return html_content
