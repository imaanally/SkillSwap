from typing import Literal
from datetime import datetime

from pydantic import (
    BaseModel,
    EmailStr,
    ConfigDict,
    Field,
    model_validator,
)


class UserCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    password: str = Field(min_length=8)
    bio: str | None = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: EmailStr
    bio: str | None = None


class SkillOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    description: str | None = None


class UserSkillCreate(BaseModel):
    skill_id: int
    type: Literal["teach", "learn"]


class UserSkillOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    type: str
    skill: SkillOut


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


class UserUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=100)
    bio: str | None = None


class ExchangeRequestCreate(BaseModel):
    receiver_id: int
    offered_skill_id: int
    requested_skill_id: int
    message: str | None = None

    @model_validator(mode="after")
    def validate_skills(self):
        if self.offered_skill_id == self.requested_skill_id:
            raise ValueError("Offered and requested skills must be different")
        return self


class ExchangeRequestUpdate(BaseModel):
    status: Literal["accepted", "rejected"]


class ExchangeRequestResponse(BaseModel):
    id: int
    sender_id: int
    receiver_id: int
    offered_skill_id: int
    requested_skill_id: int
    status: str
    message: str | None = None

    model_config = ConfigDict(from_attributes=True)
