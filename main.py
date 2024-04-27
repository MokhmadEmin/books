from fastapi import FastAPI, UploadFile, File, Response, Form
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from typing import Annotated

import db_actions
import models
from from_docx_to_html import from_docx_to_html

app = FastAPI()


origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "DELETE", "PATCH", "PUT"],
    allow_headers=["Set-Cookie", "Access-Control-Allow-Headers", "Access-Control-Allow-Origin"],
)


@app.post("/book/create")
async def create_book(author: Annotated[int, Form()],
                      name: Annotated[str, Form()],
                      description: Annotated[str, Form()],
                      icon: Annotated[UploadFile, Form()],
                      text: Annotated[UploadFile, Form()]
                      ):

    html_txt = await from_docx_to_html(text)

    await db_actions.post(models.Book, author_id=author, name=name, description=description,
                          icon=icon.file.read(), text=html_txt)


@app.put("/book/{id}/put")
async def put_book(id: Annotated[int, Form()],
                   author: Annotated[int, Form()],
                   name: Annotated[str, Form()],
                   description: Annotated[str, Form()],
                   icon: Annotated[UploadFile, Form()],
                   text: Annotated[UploadFile, Form()]
                   ):

    html_txt = await from_docx_to_html(text)

    await db_actions.put(models.Book, id, author_id=author, name=name, description=description,
                         icon=icon.file.read(), text=html_txt)


@app.delete("/book/{id}/delete")
async def delete_book(id: int):
    await db_actions.delete(models.Book, id)


@app.get("/book/all")
async def get_all_book() -> list[dict]:
    res = await db_actions.get_all(models.Book, "id", "author_id", "name", "description", "text")
    return res


@app.get("/book/{id}/icon")
async def get_book_icon(id: int) -> Response:
    res = await db_actions.get_one(models.Book, id, "icon")
    if res:
        return Response(content=res, media_type="image/")


@app.get("/book/{id}/text")
async def get_book_text(id: int) -> str:
    res = await db_actions.get_one(models.Book, id, "text")
    if res:
        return res
    else:
        return "error"


@app.get("/book/{id}/author")
async def get_book_author(id: int) -> str:
    name = await db_actions.get_one(models.Writer, id, 'name')
    surname = await db_actions.get_one(models.Writer, id, 'surname')
    if name and surname:
        return f"{name} {surname}"
    else:
        return "error"


@app.get("/book/{id}")
async def get_book(id: int) -> dict:
    res = await db_actions.get(models.Book, id, "id", "author_id", "name", "description", "text")
    if res:
        return res
    else:
        return {"error": "404"}


@app.post("/writer/create")
async def create_writer(nickname: Annotated[str, Form()],
                        name: Annotated[str, Form()],
                        surname: Annotated[str, Form()],
                        icon: Annotated[UploadFile, File()],
                        password: Annotated[str, Form()],
                        description: Annotated[str, Form()]
                        ):

    await db_actions.post(models.Writer, nickname=nickname, name=name, surname=surname, icon=icon.file.read(),
                          password=password, description=description
                          )


@app.put("/writer/{id}/put")
async def put_writer(id: Annotated[int, Form()],
                     nickname: Annotated[str, Form()],
                     name: Annotated[str, Form()],
                     surname: Annotated[str, Form()],
                     icon: Annotated[UploadFile, File()],
                     password: Annotated[str, Form()],
                     description: Annotated[str, Form()]):

    await db_actions.put(models.Writer, id, nickname=nickname, name=name, surname=surname, icon=icon.file.read(),
                         password=password, description=description
                         )


@app.delete("/writer/{id}/delete")
async def delete_writer(id: int):
    await db_actions.delete(models.Writer, id)


@app.get("/writer/check_login")
async def check_login(nickname: Annotated[str, Form()], password: Annotated[str, Form()]) -> list:
    res = await db_actions.get_by_column(models.Writer, "nickname", nickname)
    if res["nickname"] == nickname and res["password"] == password:
        return [nickname, password]
    else:
        return [{"error": "404"}]


@app.get("/writer/all")
async def get_all_writer() -> list[dict]:
    res = await db_actions.get_all(models.Writer, "id", "nickname", "name", "surname", "password", "description")
    return res


@app.get("/writer/{id}/icon")
async def get_writer_icon(id: int) -> Response:
    res = await db_actions.get_one(models.Writer, id, "icon")
    if res:
        return Response(content=res, media_type="image/")


@app.get("/writer/{id}")
async def get_writer(id: int) -> dict:
    res = await db_actions.get(models.Writer, id, "id", "nickname", "name", "surname", "password", "description")
    if res:
        return res
    else:
        return {"error": "404"}


if __name__ == '__main__':
    uvicorn.run("main:app", reload=True)
