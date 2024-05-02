from fastapi.testclient import TestClient

from .main import app

client = TestClient(app)


def test_regions():
    response = client.get("/regions")
    assert response.status_code == 200
    assert "EN" in response.json()


def test_it_works():
    response = client.get("/users/?region=de&seed=itworks&mistakes=1.3&skip=20&limit=10")
    assert response.status_code == 200

def test_users_0mistakes():
    response = client.get("/users/?region=en&seed=itworks&mistakes=0&skip=20&limit=10")
    assert response.status_code == 200
    
    first_record = response.json()["items"][0]
    assert first_record['index'] == 21
    assert first_record['name'] == 'Nathan Fox'
    assert first_record['address'] == "Waterbury, 27 Powhattan Loop"
    assert first_record['phone'] == "+1-912-198-1580"
    assert first_record['id'] == "8f92ddcea15f5a033c40006b5da5274c"


def test_users_2mistakes():
    response = client.get("/users/?region=en&seed=itworks&mistakes=2&skip=20&limit=10")
    assert response.status_code == 200
    
    first_record = response.json()["items"][0]
    assert first_record['index'] == 21
    assert first_record['name'] == 'NathanF ox'
    assert first_record['address'] == "Waterbury, 2 7 Powhattan Loop"
    assert first_record['phone'] == "+1-912-198-1580"
    assert first_record['id'] == "8f92ddcea15f5a033c40006b5da5274c"


def test_users_200mistakes():
    response = client.get("/users/?region=en&seed=itworks&mistakes=200&skip=20&limit=10")
    assert response.status_code == 200
    
    first_record = response.json()["items"][0]
    assert first_record['index'] == 21
    assert first_record['name'] == "aaiFmlkS nhm"
    assert first_record['address'] == "esar  7 ,xAH lRy2Po wsoRmnt"
    assert first_record['phone'] == "+11-451-4-9181-51-500"
    assert first_record['id'] == "8f92ddcea15f5a033c40006b5da5274c"

def test_users_2000mistakes():
    response = client.get("/users/?region=en&seed=itworks&mistakes=2000&skip=20&limit=10")
    assert response.status_code == 200
    
    first_record = response.json()["items"][0]
    assert first_record['index'] == 21
    assert first_record['name'] == "iaFeorcmn sc"
    assert first_record['address'] == "awnmu4tCroLLewMNkss ftg"
    assert first_record['phone'] == "88613117791"
    assert first_record['id'] == "8f92ddcea15f5a033c40006b5da5274c"


def test_users_20000mistakes():
    response = client.get("/users/?region=en&seed=itworks&mistakes=20000&skip=20&limit=1")
    assert response.status_code == 200
    
    first_record = response.json()["items"][0]
    assert first_record['index'] == 21
    assert first_record['name'] == "noJuenvnhwllloEMvepWtenPeyar eTdMeyeasnelroB"
    assert first_record['address'] == "5rdeya8 r75ki"
    assert first_record['phone'] == "60112361-4575-8615-60-1043-3+6948+84111464378+3+0+1111129097-1097+-0170817+16"
    assert first_record['id'] == "8f92ddcea15f5a033c40006b5da5274c"
