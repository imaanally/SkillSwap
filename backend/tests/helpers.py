from app.models import Skill
from tests.conftest import TestingSession


def signup(client, name="Amina", email="amina@example.com"):
    client.post("/api/auth/register", json={"name": name, "email": email, "password": "password123"})
    res = client.post("/api/auth/login", json={"email": email, "password": "password123"}).json()
    return res["user"]["id"], {"Authorization": f"Bearer {res['access_token']}"}


def add_skill(name="Python"):
    db = TestingSession()
    skill = Skill(name=name)
    db.add(skill)
    db.commit()
    skill_id = skill.id
    db.close()
    return skill_id