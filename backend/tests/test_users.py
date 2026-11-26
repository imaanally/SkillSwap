from tests.helpers import signup


def test_list_users(client):
    signup(client)
    res = client.get("/api/users")
    assert res.status_code == 200
    assert len(res.json()) == 1


def test_get_missing_user_returns_404(client):
    assert client.get("/api/users/999").status_code == 404


def test_update_own_profile(client):
    user_id, headers = signup(client)
    res = client.put(f"/api/users/{user_id}", json={"bio": "New bio"}, headers=headers)
    assert res.status_code == 200
    assert res.json()["bio"] == "New bio"


def test_cannot_update_someone_else(client):
    _, headers = signup(client)
    other_id, _ = signup(client, name="Hassan", email="hassan@example.com")
    res = client.put(f"/api/users/{other_id}", json={"bio": "Hacked"}, headers=headers)
    assert res.status_code == 403


def test_update_without_token_is_rejected(client):
    user_id, _ = signup(client)
    res = client.put(f"/api/users/{user_id}", json={"bio": "x"})
    assert res.status_code in (401, 403)