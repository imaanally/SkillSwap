from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import FRONTEND_URL
from app.routes import auth, users

app = FastAPI(title="SkillSwap API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_methods=["*"], allow_headers=["*"], allow_credentials=True,
)
app.include_router(auth.router)
app.include_router(users.router)


@app.get("/")
def root():
    return {"message": "SkillSwap API is running"}