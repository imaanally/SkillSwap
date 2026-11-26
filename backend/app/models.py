
from enum import Enum

from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime,
    ForeignKey,
    UniqueConstraint,
    CheckConstraint,
)
from sqlalchemy.orm import relationship, backref

from app.database import Base


class ExchangeRequestStatus(str, Enum):
    PENDING = "pending"
    ACCEPTED = "accepted"
    REJECTED = "rejected"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password_hash = Column(String(256), nullable=False)
    bio = Column(Text)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True)
    name = Column(String(100), unique=True, nullable=False)
    description = Column(Text)


class UserSkill(Base):
    __tablename__ = "user_skills"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    skill_id = Column(Integer, ForeignKey("skills.id"), nullable=False)
    type = Column(String(10), nullable=False)

    user = relationship(
        "User",
        backref=backref("user_skills", cascade="all, delete-orphan"),
    )
    skill = relationship("Skill", backref="user_skills")

    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "skill_id",
            "type",
            name="unique_user_skill_type",
        ),
        CheckConstraint(
            "type IN ('teach', 'learn')",
            name="check_user_skill_type",
        ),
    )


class ExchangeRequest(Base):
    __tablename__ = "exchange_requests"

    id = Column(Integer, primary_key=True)
    sender_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    receiver_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    offered_skill_id = Column(Integer, ForeignKey("skills.id"), nullable=False)
    requested_skill_id = Column(Integer, ForeignKey("skills.id"), nullable=False)
    status = Column(String(20), nullable=False, default="pending")
    message = Column(Text)

    sender = relationship(
        "User",
        foreign_keys=[sender_id],
        backref="sent_exchange_requests",
    )
    receiver = relationship(
        "User",
        foreign_keys=[receiver_id],
        backref="received_exchange_requests",
    )
    offered_skill = relationship("Skill", foreign_keys=[offered_skill_id])
    requested_skill = relationship("Skill", foreign_keys=[requested_skill_id])

    __table_args__ = (
        CheckConstraint(
            "status IN ('pending', 'accepted', 'rejected')",
            name="check_exchange_status",
        ),
    )


class Session(Base):
    __tablename__ = "sessions"

    id = Column(Integer, primary_key=True)
    exchange_request_id = Column(
        Integer,
        ForeignKey("exchange_requests.id"),
        nullable=False,
    )
    teacher_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    learner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    scheduled_at = Column(DateTime, nullable=False)
    duration_minutes = Column(Integer, nullable=False, default=60)
    meeting_link = Column(String(255))
    notes = Column(Text)
    status = Column(String(20), nullable=False, default="scheduled")

    exchange_request = relationship("ExchangeRequest", backref="sessions")
    teacher = relationship(
        "User",
        foreign_keys=[teacher_id],
        backref="teaching_sessions",
    )
    learner = relationship(
        "User",
        foreign_keys=[learner_id],
        backref="learning_sessions",
    )

    __table_args__ = (
        CheckConstraint(
            "status IN ('scheduled', 'completed', 'cancelled')",
            name="check_session_status",
        ),
        CheckConstraint(
            "duration_minutes > 0",
            name="check_session_duration",
        ),
    )


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True)
    session_id = Column(Integer, ForeignKey("sessions.id"), nullable=False)
    reviewer_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    reviewee_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    rating = Column(Integer, nullable=False)
    comment = Column(Text)

    session = relationship("Session", backref="reviews")
    reviewer = relationship(
        "User",
        foreign_keys=[reviewer_id],
        backref="reviews_given",
    )
    reviewee = relationship(
        "User",
        foreign_keys=[reviewee_id],
        backref="reviews_received",
    )

    __table_args__ = (
        CheckConstraint(
            "rating >= 1 AND rating <= 5",
            name="check_review_rating",
        ),
        UniqueConstraint(
            "session_id",
            "reviewer_id",
            name="unique_review_per_participant",
        ),
    )
