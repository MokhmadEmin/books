from pydantic import BaseModel
from fastapi import UploadFile


class WriterBM(BaseModel):
    id: int
    name: str
    surname: str
    icon: UploadFile
    password: str
    description: str


class BookBM(BaseModel):
    id: int
    author: int
    name: str
    description: str
    icon: UploadFile
    text: str
