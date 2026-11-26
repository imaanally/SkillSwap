from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, Skill, UserSkill
from app.schemas import SkillOut, UserSkillCreate, UserSkillOut
from app.security import get_current_user

router = APIRouter(prefix="/api", tags=["skills"])


@router.get("/skills", response_model=list[SkillOut])
def list_skills(db: Session = Depends(get_db)):
    return db.query(Skill).order_by(Skill.name).all()


@router.post("/user-skills", response_model=UserSkillOut, status_code=status.HTTP_201_CREATED)
def add_user_skill(data: UserSkillCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if db.get(Skill, data.skill_id) is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Skill not found")
    exists = db.query(UserSkill).filter_by(user_id=current_user.id, skill_id=data.skill_id, type=data.type).first()
    if exists:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Skill already on your profile")
    user_skill = UserSkill(user_id=current_user.id, skill_id=data.skill_id, type=data.type)
    db.add(user_skill)
    db.commit()
    db.refresh(user_skill)
    return user_skill


@router.delete("/user-skills/{user_skill_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_user_skill(user_skill_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    user_skill = db.get(UserSkill, user_skill_id)
    if user_skill is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Skill entry not found")
    if user_skill.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You can only remove your own skills")
    db.delete(user_skill)
    db.commit()