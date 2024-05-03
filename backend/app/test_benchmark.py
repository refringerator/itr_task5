from fastapi.testclient import TestClient
import pytest

from .main import app
from .generator import generate_many
from .errors import ErrType, enum_by_index

client = TestClient(app)


@pytest.mark.performance
@pytest.mark.parametrize("n", [0, 2, 20, 200, 2000, 20000])
def test_users_benchmark(benchmark, n):
    res = benchmark(
        generate_many, skip=20, limit=20, region="en", user_seed="itworks", mistakes=n
    )
    assert res is not None


@pytest.mark.performance
@pytest.mark.parametrize("n", [0, 2, 20, 200, 2000, 20000])
def test_error_apply_benchmark(benchmark, n):
    s = list("Some string for testing and performance measurements")

    fc = len(ErrType.get_values())

    def bench_func(iterations: int):
        for i in range(iterations):
            enum_by_index(ErrType, i % fc)(s, i, 10000 * "*")
        return "OK"

    res = benchmark(bench_func, iterations=n)
    assert res is not None
