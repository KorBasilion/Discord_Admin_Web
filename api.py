from fastapi import FastAPI
from pydantic import BaseModel
import json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pinned_file_path = "./web_page/src/database/pinnedChannel.json"
pin_able_file_path = "./web_page/src/database/pinAbleChannel.json"

class Item(BaseModel):
    channel: str
    comment: str = None

@app.get("/")
def read_root():
    return {"Root":"Root"}

@app.get("/pinAbleList")
def load_list():
    with open(pin_able_file_path, 'r', encoding="utf8") as file:
        data = json.load(file)
    return { "pin_able_list_data" : data }

@app.get("/pinnedList")
def load_pins():
    with open(pinned_file_path, 'r', encoding="utf8") as file:
        data = json.load(file)
    return { "pinned_list_data" : data }

@app.post("/postList/")
async def update_pins(item: Item):
    with open(pinned_file_path, 'r', encoding="utf8") as file:
        data = json.load(file)
        data[item.channel] = item.comment
    with open(pinned_file_path, 'w', encoding="utf8") as file:
        json.dump(data, file, ensure_ascii=False)
    return {"result":item.comment}

@app.post("/deleteList/")
async def update_pins(item: Item):
    with open(pinned_file_path, 'r', encoding="utf8") as file:
        data = json.load(file)
        del data[item.channel]
    with open(pinned_file_path, 'w', encoding="utf8") as file:
        json.dump(data, file, ensure_ascii=False)
    return {"result":"삭제"}    