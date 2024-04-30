from fastapi.testclient import TestClient

from .main import app

client = TestClient(app)


def test_regions():
    response = client.get("/regions")
    assert response.status_code == 200
    assert "EN" in response.json()
