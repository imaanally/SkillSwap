from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import ExchangeRequest, Skill, User, UserSkill
from app.schemas import ExchangeRequestCreate, ExchangeRequestResponse
from app.security import get_current_user

router = APIRouter(prefix="/api", tags=["Exchanges"])


@router.get("/requests/health")
def exchange_health():
    return {"message": "Exchange routes are working"}


@router.post(
    "/requests",
    response_model=ExchangeRequestResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_exchange_request(
    data: ExchangeRequestCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if data.receiver_id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You cannot send an exchange request to yourself",
        )

    receiver = db.get(User, data.receiver_id)
    if receiver is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Receiver not found",
        )

    offered_skill = db.get(Skill, data.offered_skill_id)
    requested_skill = db.get(Skill, data.requested_skill_id)

    if offered_skill is None or requested_skill is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="One or both skills were not found",
        )

    sender_can_teach = (
        db.query(UserSkill)
        .filter_by(
            user_id=current_user.id,
            skill_id=data.offered_skill_id,
            type="teach",
        )
        .first()
    )

    receiver_can_teach = (
        db.query(UserSkill)
        .filter_by(
            user_id=data.receiver_id,
            skill_id=data.requested_skill_id,
            type="teach",
        )
        .first()
    )

    if sender_can_teach is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You must list the offered skill as a skill you teach",
        )

    if receiver_can_teach is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The receiver must list the requested skill as a skill they teach",
        )

    exchange_request = ExchangeRequest(
        sender_id=current_user.id,
        receiver_id=data.receiver_id,
        offered_skill_id=data.offered_skill_id,
        requested_skill_id=data.requested_skill_id,
        message=data.message,
        status="pending",
    )

    db.add(exchange_request)
    db.commit()
    db.refresh(exchange_request)

    return exchange_request


@router.get("/requests", response_model=list[ExchangeRequestResponse])
def get_exchange_requests(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    requests = (
        db.query(ExchangeRequest)
        .filter(
            (ExchangeRequest.sender_id == current_user.id)
            | (ExchangeRequest.receiver_id == current_user.id)
        )
        .order_by(ExchangeRequest.id.desc())
        .all()
    )

    return requests


def get_request_for_receiver(
    request_id: int,
    db: Session,
    current_user: User,
):
    exchange_request = db.get(ExchangeRequest, request_id)

    if exchange_request is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Exchange request not found",
        )

    if exchange_request.receiver_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only the recipient can respond to this request",
        )

    return exchange_request
