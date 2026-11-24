from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import (
    ExchangeRequest,
    Skill,
    User,
    UserSkill,
    Session as LearningSession,
    Review,
)
from app.schemas import (
    ExchangeRequestCreate,
    ExchangeRequestUpdate,
    ExchangeRequestResponse,
    SessionCreate,
    SessionResponse,
    SessionUpdate,
    ReviewCreate,
    ReviewResponse,
)
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


@router.put("/requests/{request_id}", response_model=ExchangeRequestResponse)
def respond_to_exchange_request(
    request_id: int,
    data: ExchangeRequestUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    exchange_request = get_request_for_receiver(
        request_id,
        db,
        current_user,
    )

    if exchange_request.status != "pending":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This request has already been responded to",
        )

    exchange_request.status = data.status

    db.commit()
    db.refresh(exchange_request)

    return exchange_request


@router.post(
    "/sessions",
    response_model=SessionResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_session(
    data: SessionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    exchange_request = db.get(
        ExchangeRequest,
        data.exchange_request_id,
    )

    if exchange_request is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Exchange request not found",
        )

    if current_user.id not in (
        exchange_request.sender_id,
        exchange_request.receiver_id,
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not a participant in this exchange",
        )

    if exchange_request.status != "accepted":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Sessions can only be created for accepted exchanges",
        )

    new_session = LearningSession(
        exchange_request_id=exchange_request.id,
        teacher_id=exchange_request.sender_id,
        learner_id=exchange_request.receiver_id,
        scheduled_at=data.scheduled_at,
        duration_minutes=data.duration_minutes,
        meeting_link=data.meeting_link,
        notes=data.notes,
        status="scheduled",
    )

    db.add(new_session)
    db.commit()
    db.refresh(new_session)

    return new_session


@router.get("/sessions", response_model=list[SessionResponse])
def get_sessions(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    sessions = (
        db.query(LearningSession)
        .filter(
            (LearningSession.teacher_id == current_user.id)
            | (LearningSession.learner_id == current_user.id)
        )
        .order_by(LearningSession.scheduled_at.desc())
        .all()
    )

    return sessions


@router.put("/sessions/{session_id}", response_model=SessionResponse)
def update_session(
    session_id: int,
    data: SessionUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    learning_session = db.get(LearningSession, session_id)

    if learning_session is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Session not found",
        )

    if current_user.id not in (
        learning_session.teacher_id,
        learning_session.learner_id,
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not a participant in this session",
        )

    if learning_session.status != "scheduled":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only scheduled sessions can be updated",
        )

    learning_session.status = data.status

    db.commit()
    db.refresh(learning_session)

    return learning_session


@router.post(
    "/reviews",
    response_model=ReviewResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_review(
    data: ReviewCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    learning_session = db.get(LearningSession, data.session_id)

    if learning_session is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Session not found",
        )

    if current_user.id not in (
        learning_session.teacher_id,
        learning_session.learner_id,
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only session participants can leave a review",
        )

    if learning_session.status != "completed":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Reviews can only be submitted for completed sessions",
        )

    existing_review = (
        db.query(Review)
        .filter_by(
            session_id=data.session_id,
            reviewer_id=current_user.id,
        )
        .first()
    )

    if existing_review:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You have already reviewed this session",
        )

    reviewee_id = (
        learning_session.learner_id
        if current_user.id == learning_session.teacher_id
        else learning_session.teacher_id
    )

    review = Review(
        session_id=data.session_id,
        reviewer_id=current_user.id,
        reviewee_id=reviewee_id,
        rating=data.rating,
        comment=data.comment,
    )

    db.add(review)
    db.commit()
    db.refresh(review)

    return review


@router.get(
    "/reviews/{user_id}",
    response_model=list[ReviewResponse],
)
def get_user_reviews(
    user_id: int,
    db: Session = Depends(get_db),
):
    user = db.get(User, user_id)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    reviews = (
        db.query(Review)
        .filter(Review.reviewee_id == user_id)
        .order_by(Review.id.desc())
        .all()
    )

    return reviews
