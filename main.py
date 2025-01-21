from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from pydantic import BaseModel
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    id: Optional[int] = None
    content: str

messages: List[Message] = []
m_id_counter = 1

@app.get("/")
def root():
    data = {"message": "Hello World"}
    return JSONResponse(content=data)

@app.get("/api/messages")
def get_messages():
    return messages

@app.post("/api/messages")
def send_message(content: Message):
    global m_id_counter
    print("this is the content", content)
    new_message = Message(id=m_id_counter, content=content.content)
    messages.append(new_message)
    m_id_counter += 1
    print(type(messages))
    return content

@app.delete("/api/messages/{m_id}")
def delete_message(m_id: int):
    for m in messages:
        if m.id == m_id:
            messages.remove(m)
    data = {"message": "Successfully deleted message"}
    return JSONResponse(content=data)

@app.put("/api/messages{m_id}")
def edit_message(m_id: int, new_content: str):
    for m in messages:
        if m.id == m_id:
            m.content = new_content
    data = {"message": "Edited message"}
    return JSONResponse(content=data)

if __name__ == '__main__':
    app.run(debug=True)