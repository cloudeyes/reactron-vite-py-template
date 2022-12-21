"""FastAPI Backend."""

import os
import sys

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

VITE_PORT = os.environ.get('VITE_PORT', '3000')

if "uvicorn" in sys.argv[0]:
    # CORS settings

    origins = [f"http://localhost:{VITE_PORT}"]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# --------------------------- REST CALLS -----------------------------
@app.get("/example")
def example():
    return {"hello": "world"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}


# --------------------------- SYSTEM API -----------------------------
@app.post("/quit")
def quit():
    import psutil

    parent_pid = os.getpid()
    parent = psutil.Process(parent_pid)
    for child in parent.children(recursive=True):
        child.kill()
    parent.kill()
