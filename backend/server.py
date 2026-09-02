from fastapi import FastAPI, APIRouter, HTTPException, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, BeforeValidator, field_validator
from typing import List, Optional, Annotated
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]
ADMIN_KEY = os.environ['ADMIN_KEY']

app = FastAPI(title="Suvi Interior API")
api_router = APIRouter(prefix="/api")

PyObjectId = Annotated[str, BeforeValidator(str)]

PROJECT_TYPES = [
    "Full Home Interior",
    "Modular Kitchen",
    "Living Room",
    "Bedroom",
    "Furniture",
    "TV Unit",
    "Other",
]


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    def to_mongo(self) -> dict:
        data = self.model_dump(by_alias=True, exclude_none=True)
        data.pop("_id", None)
        return data

    @classmethod
    def from_mongo(cls, doc: dict):
        return cls.model_validate(doc)


class EnquiryCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    phone: str = Field(min_length=7, max_length=20)
    email: Optional[str] = Field(default=None, max_length=160)
    project_type: str
    requirement: Optional[str] = Field(default=None, max_length=300)
    message: Optional[str] = Field(default=None, max_length=2000)
    source_page: Optional[str] = Field(default=None, max_length=200)

    @field_validator("phone")
    @classmethod
    def phone_digits(cls, v: str) -> str:
        digits = re.sub(r"\D", "", v)
        if len(digits) < 10 or len(digits) > 13:
            raise ValueError("Please enter a valid phone number")
        return v.strip()

    @field_validator("email")
    @classmethod
    def email_shape(cls, v: Optional[str]) -> Optional[str]:
        if v is None or v.strip() == "":
            return None
        v = v.strip()
        if not re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", v):
            raise ValueError("Please enter a valid email address")
        return v

    @field_validator("project_type")
    @classmethod
    def project_type_allowed(cls, v: str) -> str:
        if v not in PROJECT_TYPES:
            raise ValueError("Please choose a project type")
        return v


class Enquiry(EnquiryCreate, BaseDocument):
    status: str = "new"
    created_at: str


@api_router.get("/health")
async def health():
    return {"status": "ok", "service": "suvi-interior"}


@api_router.get("/enquiries/project-types")
async def project_types():
    return {"project_types": PROJECT_TYPES}


@api_router.post("/enquiries", response_model=Enquiry, response_model_by_alias=False, status_code=201)
async def create_enquiry(payload: EnquiryCreate):
    enquiry = Enquiry(
        **payload.model_dump(),
        created_at=datetime.now(timezone.utc).isoformat(),
    )
    result = await db.enquiries.insert_one(enquiry.to_mongo())
    doc = await db.enquiries.find_one({"_id": result.inserted_id})
    return Enquiry.from_mongo(doc)


@api_router.get("/enquiries", response_model=List[Enquiry], response_model_by_alias=False)
async def list_enquiries(x_admin_key: Optional[str] = Header(default=None)):
    if x_admin_key != ADMIN_KEY:
        raise HTTPException(status_code=401, detail="Unauthorized")
    docs = await db.enquiries.find({}).sort("created_at", -1).to_list(500)
    return [Enquiry.from_mongo(d) for d in docs]


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
