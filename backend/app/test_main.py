from fastapi.testclient import TestClient

from .main import app

client = TestClient(app)


def test_regions():
    response = client.get("/regions")
    assert response.status_code == 200
    assert "EN" in response.json()


def test_it_works():
    response = client.get(
        "/users/?region=de&seed=itworks&mistakes=1.3&skip=20&limit=10"
    )
    assert response.status_code == 200


def test_users_0mistakes():
    response = client.get("/users/?region=en&seed=itworks&mistakes=0&skip=20&limit=10")
    assert response.status_code == 200

    first_record = response.json()["items"][0]
    assert first_record["index"] == 21
    assert first_record["name"] == "Nathan Fox"
    assert first_record["address"] == "Waterbury, 27 Powhattan Loop"
    assert first_record["phone"] == "+1-912-198-1580"
    assert first_record["id"] == "8f92ddcea15f5a033c40006b5da5274c"


def test_users_2mistakes():
    response = client.get("/users/?region=en&seed=itworks&mistakes=2&skip=20&limit=10")
    assert response.status_code == 200

    first_record = response.json()["items"][0]
    assert first_record["index"] == 21
    assert first_record["name"] == "Nathn Fox"
    assert first_record["address"] == "Waterbury, 27 Powhattan Loop"
    assert first_record["phone"] == "+1-9121-98-1580"
    assert first_record["id"] == "8f92ddcea15f5a033c40006b5da5274c"


def test_users_200mistakes():
    response = client.get(
        "/users/?region=en&seed=itworks&mistakes=200&skip=20&limit=10"
    )
    assert response.status_code == 200

    first_record = response.json()["items"][0]
    assert first_record["index"] == 21
    assert first_record["name"] == "G"
    assert first_record["address"] == "1er uee5neoHG M tdah,na Lop"
    assert first_record["phone"] == "1928+62899+99-31"
    assert first_record["id"] == "8f92ddcea15f5a033c40006b5da5274c"


def test_users_2000mistakes():
    response = client.get(
        "/users/?region=en&seed=itworks&mistakes=2000&skip=20&limit=10"
    )
    assert response.status_code == 200

    first_record = response.json()["items"][0]
    assert first_record["index"] == 21
    assert first_record["name"] == "o  estlteTGet soaRisSnr"
    assert first_record["address"] == "shl,tteae"
    assert first_record["phone"] == "+404415"
    assert first_record["id"] == "8f92ddcea15f5a033c40006b5da5274c"


def test_users_20000mistakes():
    response = client.get(
        "/users/?region=en&seed=itworks&mistakes=20000&skip=20&limit=1"
    )
    assert response.status_code == 200

    first_record = response.json()["items"][0]
    assert first_record["index"] == 21
    assert first_record["name"] == "cdBrss nz silPrcnigtaoienrK  yyoeene"
    assert first_record["address"] == "oa t yeareetc c dn1  a  ec   rr6lWrpe,a siild"
    assert first_record["phone"] == "55194039707411975919+57+4-7492+7120127+7"
    assert first_record["id"] == "8f92ddcea15f5a033c40006b5da5274c"
