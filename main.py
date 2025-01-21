from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.post("/message")
def send_message():
    return {"message": "Message successfully sent"}

@app.delete("/message")
def delete_message():
    return {"message": "Successfully deleted message"}

@app.put("/message")
def edit_message():
    return {"message": "Edited message"}