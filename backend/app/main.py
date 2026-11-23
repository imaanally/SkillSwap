from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import FRONTEND_URL

app = FastAPI(title="SkillSwap API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_methods=["*"], allow_headers=["*"], allow_credentials=True,
)


@app.get("/")
def root():
    return {"message": "SkillSwap API is running"}