from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from emergentintegrations.llm.chat import LlmChat, UserMessage, TextDelta, StreamDone
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

RESUME_TEXT = (ROOT_DIR.parent / "frontend" / "public" / "llms.txt").read_text()
SYSTEM_PROMPT = (
    "You are the resume assistant on Siddharth Palnitkar's personal website. Answer visitors' questions about him "
    "in a friendly, concise way (2-4 sentences), in the third person, using ONLY the resume below. If something is "
    "not in the resume, say so and suggest emailing him. Never invent facts. Never share a phone number or home address. "
    "Politely decline unrelated requests.\n\nRESUME:\n" + RESUME_TEXT
)


class ChatTurn(BaseModel):
    role: str
    text: str = Field(max_length=1000)


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=500)
    history: List[ChatTurn] = Field(default_factory=list, max_length=12)


@api_router.post("/chat")
async def chat(req: ChatRequest):
    key = os.environ.get("EMERGENT_LLM_KEY")
    if not key:
        raise HTTPException(503, "AI chat not configured")
    convo = "\n".join(f"{'Visitor' if t.role == 'user' else 'Assistant'}: {t.text}" for t in req.history[-6:])
    prompt = (f"Conversation so far:\n{convo}\n\n" if convo else "") + f"Visitor: {req.message}"
    llm = LlmChat(api_key=key, session_id=str(uuid.uuid4()), system_message=SYSTEM_PROMPT).with_model("openai", "gpt-5.6-terra")

    async def gen():
        async for ev in llm.stream_message(UserMessage(text=prompt)):
            if isinstance(ev, TextDelta):
                yield ev.content
            elif isinstance(ev, StreamDone):
                break

    return StreamingResponse(gen(), media_type="text/plain; charset=utf-8",
                             headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"})

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()