from fastapi import APIRouter, Form, UploadFile, File, Response

from typing import Annotated

import db_actions
import models


writer_router = APIRouter(
    prefix="/writer",
    tags=["Writer"]
)


@writer_router.post("/create")
async def create_writer(nickname: Annotated[str, Form()],
                        name: Annotated[str, Form()],
                        surname: Annotated[str, Form()],
                        icon: Annotated[UploadFile, File()],
                        password: Annotated[str, Form()],
                        description: Annotated[str, Form()]
                        ):

    return await db_actions.post(models.Writer, nickname=nickname, name=name, surname=surname, icon=icon.file.read(),
                                    password=password, description=description
                                )


@writer_router.put("/{id}/put")
async def put_writer(id: int,
                     nickname: Annotated[str, Form()],
                     name: Annotated[str, Form()],
                     surname: Annotated[str, Form()],
                     icon: Annotated[UploadFile, File()],
                     password: Annotated[str, Form()],
                     description: Annotated[str, Form()]):

    await db_actions.put(models.Writer, id, nickname=nickname, name=name, surname=surname, icon=icon.file.read(),
                         password=password, description=description
                         )


@writer_router.delete("/{id}/delete")
async def delete_writer(id: int):
    await db_actions.delete(models.Writer, id)


@writer_router.post("/check_login")
async def check_login(nickname: Annotated[str, Form()], password: Annotated[str, Form()]) -> bool:
    try:
        res = await db_actions.get_by_column(models.Writer, "nickname", nickname, "id", "nickname", "name", "surname", "password", "description")
        if res["nickname"] == nickname and res["password"] == password:
            return True
        else:
            return False
    except KeyError:
        return False


@writer_router.post("/profile")
async def profile(nickname: Annotated[str, Form()],  password: Annotated[str, Form()]) -> dict | bool:
    try:
        res = await db_actions.get_by_column(models.Writer, "nickname", nickname, "id", "nickname", "name", "surname", "password", "description")
        if res["nickname"] == nickname and res["password"] == password:
            return res
        else:
            return False
    except KeyError:
        return False


@writer_router.get("/get_id/{nickname}")
async def get_id_by_nickname(nickname: str) -> int:
    try:
        res = await db_actions.get_by_column(models.Writer, "nickname", nickname, "id")
        return res["id"]
    except KeyError:
        return 0


@writer_router.get("/all")
async def get_all_writer() -> list[dict]:
    res = await db_actions.get_all(models.Writer, "id", "nickname", "name", "surname", "password", "description")
    return res


@writer_router.get("/{id}/books")
async def get_writer_books(id: int) -> list[dict]:
    res = await db_actions.get_all_by_column(models.Book, "author_id", id, "id", "author_id", "name", "description", "text")
    return res


@writer_router.get("/{id}/icon")
async def get_writer_icon(id: int) -> Response:
    res = await db_actions.get_one(models.Writer, id, "icon")
    return Response(content=res, media_type="image/")


@writer_router.get("/{id}")
async def get_writer(id: int) -> dict:
    res = await db_actions.get(models.Writer, id, "id", "nickname", "name", "surname", "password", "description")
    return res
