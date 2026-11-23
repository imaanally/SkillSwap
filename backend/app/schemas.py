from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field, model_validator


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
    status: str = Field(pattern="^(accepted|rejected)$")


class ExchangeRequestResponse(BaseModel):
    id: int
    sender_id: int
    receiver_id: int
    offered_skill_id: int
    requested_skill_id: int
    status: str
    message: str | None = None

    model_config = ConfigDict(from_attributes=True)
