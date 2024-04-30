PYTHON = python3
.PHONY = test

test:
	PYTHONPATH=. ${PYTHON} -m pytest

run:
	uvicorn app.main:app --reload --host 0.0.0.0 --port 9191

format:
	ruff format .

lint:
	ruff check .

lintfix:
	ruff check . --unsafe-fixes --fix