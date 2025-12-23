import socketio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

sio = socketio.AsyncServer(
    cors_allowed_origins="*",
    async_mode="asgi"
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

sio_app = socketio.ASGIApp(sio, app)

@sio.event
async def connect(sid, environ):
    print(f"User connected: {sid}")

@sio.event
async def disconnect(sid):
    print(f"User disconnected: {sid}")

@sio.event
async def draw_start(sid, data):
    await sio.emit("draw-start", data, skip_sid=sid)

@sio.event
async def drawing(sid, data):
    await sio.emit("drawing", data, skip_sid=sid)

@sio.event
async def draw_end(sid):
    await sio.emit("draw-end", skip_sid=sid)

@app.get("/")
async def root():
    return {"status": "SyncBoard backend running"}
