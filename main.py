from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from dotenv import load_dotenv

import os

from routers.books import book_router
from routers.writers import writer_router


app = FastAPI()

load_dotenv()

origins = [
    os.environ.get("CLIENT_URL")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "DELETE", "PATCH", "PUT"],
    allow_headers=["Set-Cookie", "Access-Control-Allow-Headers", "Access-Control-Allow-Origin"],
)

app.include_router(book_router)
app.include_router(writer_router)

if __name__ == '__main__':
    uvicorn.run("main:app", reload=True)
