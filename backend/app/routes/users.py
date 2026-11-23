from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, Skill, UserSkill
from app.schemas import UserOut
from app.security import get_current_user

router = APIRouter(prefix="/api/users", tags=["users"])