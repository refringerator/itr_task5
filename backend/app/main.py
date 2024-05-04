from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .generator import generate_many, available_regions

app = FastAPI()

origins = [
    "https://refringerator.github.io",
    "https://refringerator.github.io/itr_task5/",
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/regions/")
async def regions():
    return available_regions()


@app.get("/users/")
async def get_users(
    region: str, seed: str, mistakes: float, skip: int = 0, limit: int = 10
):
    return {"next_page": {"skip": skip + limit, "limit": 10}, "items": generate_many(skip, limit, region, seed, mistakes)}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app=app, port=9191)
