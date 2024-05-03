from fastapi.testclient import TestClient
import pytest

from .main import app
from .generator import generate_many

client = TestClient(app)


@pytest.mark.performance
@pytest.mark.parametrize("n", [0, 2, 20, 200, 2000, 20000])
def test_users_benchmark(benchmark, n):
    res = benchmark(
        generate_many, skip=20, limit=20, region="en", user_seed="itworks", mistakes=n
    )
    assert res is not None
