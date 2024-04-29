import tortoise
from tortoise import Tortoise, run_async
from tortoise.exceptions import DoesNotExist, IntegrityError

from typing import Type, Any

from db_config import DB_CONFIG


async def init():
    await Tortoise.init(config=DB_CONFIG)
    await Tortoise.generate_schemas()


async def get(model: Type[tortoise.models.Model], id: int, *args) -> dict:
    try:
        entry = await model.get(id=id).values(*args)
        return entry
    except DoesNotExist:
        return {"error": "404"}


async def get_by_column(model: Type[tortoise.models.Model], col: str, value: Any, *args) -> dict:
    try:
        entry = await model.get(**{col: value}).values(*args)
        return entry
    except DoesNotExist:
        return {"error": "404"}


async def get_all(model: Type[tortoise.models.Model], *args) -> list[dict]:
    entries = await model.all().values(*args)
    return entries


async def get_one(model: Type[tortoise.models.Model], id: int, col: str) -> str:
    try:
        entry = await model.filter(id=id).values(col)
        return entry[0][col]
    except DoesNotExist:
        return "404"
    except IndexError:
        return "404"


async def post(model: Type[tortoise.models.Model], **kwargs) -> str:
    try:
        await model.create(**kwargs)
        return "OK"
    except IntegrityError:
        return "error: this account is already taken by someone else"


async def put(model: Type[tortoise.models.Model], id: int, **kwargs):
    try:
        entry = await model.get(id=id)
        await entry.update_from_dict(kwargs)
        await entry.save()
    except DoesNotExist:
        return "404"


async def delete(model: Type[tortoise.models.Model], id: int):
    try:
        entry = await model.get(id=id)
        await entry.delete()
    except DoesNotExist:
        return "404"


run_async(init())
