from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    data = {"message": "Hello World"}
    return JSONResponse(content=data)

@app.get("/api/message")
def root():
    data = {"message": "Hello World"}
    return JSONResponse(content=data)

@app.post("/api/message")
def send_message():
    data = {"message": "Message successfully sent"}
    return JSONResponse(content=data)

@app.delete("/api/message")
def delete_message():
    data = {"message": "Successfully deleted message"}
    return JSONResponse(content=data)

@app.put("/api/message")
def edit_message():
    data = {"message": "Edited message"}
    return JSONResponse(content=data)

if __name__ == '__main__':
    app.run(debug=True)