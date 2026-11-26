from tests.helpers import signup, add_skill
from tests.conftest import TestingSession
from app.models import UserSkill


def add_user_skill(user_id, skill_id, skill_type):
    db = TestingSession()
    entry = UserSkill(
        user_id=user_id,
        skill_id=skill_id,
        type=skill_type,
    )
    db.add(entry)
    db.commit()
    db.close()


def test_complete_exchange_workflow(client):
    sender_id, sender_headers = signup(client, "Amina", "amina@example.com")
    receiver_id, receiver_headers = signup(client, "Hassan", "hassan@example.com")

    python_id = add_skill("Python")
    design_id = add_skill("Graphic Design")

    add_user_skill(sender_id, python_id, "teach")
    add_user_skill(sender_id, design_id, "learn")
    add_user_skill(receiver_id, design_id, "teach")
    add_user_skill(receiver_id, python_id, "learn")

    request_response = client.post(
        "/api/requests",
        json={
            "receiver_id": receiver_id,
            "offered_skill_id": python_id,
            "requested_skill_id": design_id,
            "message": "Let's exchange skills!",
        },
        headers=sender_headers,
    )

    assert request_response.status_code == 201
    request_id = request_response.json()["id"]

    accept_response = client.put(
        f"/api/requests/{request_id}",
        json={"status": "accepted"},
        headers=receiver_headers,
    )

    assert accept_response.status_code == 200
    assert accept_response.json()["status"] == "accepted"

    session_response = client.post(
        "/api/sessions",
        json={
            "exchange_request_id": request_id,
            "scheduled_at": "2026-12-01T10:00:00",
            "duration_minutes": 60,
            "notes": "First learning session",
        },
        headers=sender_headers,
    )

    assert session_response.status_code == 201
    session_id = session_response.json()["id"]

    complete_response = client.put(
        f"/api/sessions/{session_id}",
        json={"status": "completed"},
        headers=sender_headers,
    )

    assert complete_response.status_code == 200
    assert complete_response.json()["status"] == "completed"

    review_response = client.post(
        "/api/reviews",
        json={
            "session_id": session_id,
            "rating": 5,
            "comment": "Great learning experience!",
        },
        headers=sender_headers,
    )

    assert review_response.status_code == 201

    receiver_review = client.post(
        "/api/reviews",
        json={
            "session_id": session_id,
            "rating": 4,
            "comment": "Very helpful session!",
        },
        headers=receiver_headers,
    )

    assert receiver_review.status_code == 201

    reviews = client.get(f"/api/reviews/{receiver_id}")
    assert reviews.status_code == 200
    assert len(reviews.json()) == 1

    sessions = client.get("/api/sessions", headers=sender_headers)
    assert sessions.status_code == 200
    assert len(sessions.json()) == 1
