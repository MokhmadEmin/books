from fastapi import APIRouter, Form, UploadFile, File, Response

from typing import Annotated

import db_actions
import models
from from_docx_to_html import from_docx_to_html

book_router = APIRouter(
    prefix="/book",
    tags=["Book"]
)


@book_router.post("/create")
async def create_book(author: Annotated[int, Form()],
                      name: Annotated[str, Form()],
                      description: Annotated[str, Form()],
                      icon: Annotated[UploadFile, File()],
                      text: Annotated[UploadFile, Form()]
                      ):

    html_txt = await from_docx_to_html(text)

    await db_actions.post(models.Book, author_id=author, name=name, description=description,
                          icon=icon.file.read(), text=html_txt)


@book_router.put("/{id}/put")
async def put_book(id: int,
                   author: Annotated[int, Form()],
                   name: Annotated[str, Form()],
                   description: Annotated[str, Form()],
                   icon: Annotated[UploadFile, File()],
                   text: Annotated[UploadFile, Form()]
                   ):

    html_txt = await from_docx_to_html(text)

    await db_actions.put(models.Book, id, author_id=author, name=name, description=description,
                         icon=icon.file.read(), text=html_txt)


@book_router.delete("/{id}/delete")
async def delete_book(id: int):
    await db_actions.delete(models.Book, id)


@book_router.get("/all")
async def get_all_book() -> list[dict]:
    res = await db_actions.get_all(models.Book, "id", "author_id", "name", "description", "text")
    return res


@book_router.get("/{id}/icon")
async def get_book_icon(id: int) -> Response:
    res = await db_actions.get_one(models.Book, id, "icon")
    return Response(content=res, media_type="image/")


@book_router.get("/{id}/text")
async def get_book_text(id: int) -> str:
    res = await db_actions.get_one(models.Book, id, "text")
    return res


@book_router.get("/{id}/author")
async def get_book_author(id: int) -> str:
    name = await db_actions.get_one(models.Writer, id, 'name')
    surname = await db_actions.get_one(models.Writer, id, 'surname')
    if name and surname:
        return f"{name} {surname}"


@book_router.get("/{id}")
async def get_book(id: int) -> dict:
    res = await db_actions.get(models.Book, id, "id", "author_id", "name", "description", "text")
    return res
