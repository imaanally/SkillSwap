def register(client, email="amina@example.com"):
    return client.post("/api/auth/register", json={"name": "Amina", "email": email, "password": "password123"})


def test_register_creates_user(client):
    res = register(client)
    assert res.status_code == 201
    assert res.json()["email"] == "amina@example.com"
    assert "password_hash" not in res.json()


def test_register_duplicate_email_returns_409(client):
    register(client)
    assert register(client).status_code == 409


def test_login_returns_token(client):
    register(client)
    res = client.post("/api/auth/login", json={"email": "amina@example.com", "password": "password123"})
    assert res.status_code == 200
    assert res.json()["access_token"]


def test_login_wrong_password_returns_401(client):
    register(client)
    res = client.post("/api/auth/login", json={"email": "amina@example.com", "password": "wrongpass1"})
    assert res.status_code == 401