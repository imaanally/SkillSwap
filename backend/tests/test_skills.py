from tests.helpers import signup, add_skill


def test_list_skills(client):
    add_skill("Python")
    res = client.get("/api/skills")
    assert res.status_code == 200
    assert res.json()[0]["name"] == "Python"


def test_add_skill_to_profile(client):
    skill_id = add_skill()
    _, headers = signup(client)
    res = client.post("/api/user-skills", json={"skill_id": skill_id, "type": "teach"}, headers=headers)
    assert res.status_code == 201
    assert res.json()["skill"]["name"] == "Python"


def test_add_same_skill_twice_returns_409(client):
    skill_id = add_skill()
    _, headers = signup(client)
    body = {"skill_id": skill_id, "type": "teach"}
    client.post("/api/user-skills", json=body, headers=headers)
    assert client.post("/api/user-skills", json=body, headers=headers).status_code == 409


def test_invalid_type_returns_422(client):
    skill_id = add_skill()
    _, headers = signup(client)
    res = client.post("/api/user-skills", json={"skill_id": skill_id, "type": "teacher"}, headers=headers)
    assert res.status_code == 422


def test_search_users_by_skill(client):
    skill_id = add_skill("Graphic Design")
    _, headers = signup(client)
    client.post("/api/user-skills", json={"skill_id": skill_id, "type": "teach"}, headers=headers)
    res = client.get("/api/users", params={"skill": "design"})
    assert [u["name"] for u in res.json()] == ["Amina"]


def test_cannot_delete_someone_elses_skill(client):
    skill_id = add_skill()
    _, amina = signup(client)
    _, hassan = signup(client, name="Hassan", email="hassan@example.com")
    entry = client.post("/api/user-skills", json={"skill_id": skill_id, "type": "teach"}, headers=amina).json()
    assert client.delete(f"/api/user-skills/{entry['id']}", headers=hassan).status_code == 403
    assert client.delete(f"/api/user-skills/{entry['id']}", headers=amina).status_code == 204