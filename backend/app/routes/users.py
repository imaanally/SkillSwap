from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, Skill, UserSkill
from app.schemas import UserOut
from app.security import get_current_user

router = APIRouter(prefix="/api/users", tags=["users"])
@router.get("", response_model=list[UserOut])
def list_users(skill: str | None = None, db: Session = Depends(get_db)):
    query = db.query(User)
    if skill:
        query = query.join(UserSkill).join(Skill).filter(Skill.name.ilike(f"%{skill}%"), UserSkill.type == "teach")