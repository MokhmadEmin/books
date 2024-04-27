import tortoise
from tortoise import Tortoise, run_async

from typing import Type, Any

from db_config import DB_CONFIG


async def init():
    await Tortoise.init(config=DB_CONFIG)
    await Tortoise.generate_schemas()


async def get(model: Type[tortoise.models.Model], id: int, *args) -> dict:
    entry = await model.get(id=id).values(*args)
    if entry:
        return entry
    else:
        return {"error": "404"}


async def get_by_column(model: Type[tortoise.models.Model], col: str, value: Any) -> dict:
    entry = await model.get(**{col: value})
    if entry:
        return entry
    else:
        return {"error": "404"}


async def get_all(model: Type[tortoise.models.Model], *args) -> list[dict]:
    entries = await model.all().values(*args)
    return entries


async def get_one(model: Type[tortoise.models.Model], id: int, col: str) -> str:
    entry = await model.filter(id=id).values(col)
    if entry:
        return entry[0][col]
    else:
        return "404"


async def post(model: Type[tortoise.models.Model], **kwargs):
    await model.create(**kwargs)


async def put(model: Type[tortoise.models.Model], id: int, **kwargs):
    entry = await model.get(id=id)
    if entry:
        await entry.update_from_dict(kwargs)
        await entry.save()
    else:
        return "404"


async def delete(model: Type[tortoise.models.Model], id: int):
    entry = await model.get(id=id)
    if entry:
        await entry.delete()
    else:
        return "404"


run_async(init())
