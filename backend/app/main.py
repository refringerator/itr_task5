from fastapi import FastAPI
from app.generator import generate_many, available_regions

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/regions/")
async def regions():
    return available_regions()


@app.get("/users/")
def get_users(region: str, seed: int, mistakes: float, skip: int = 0, limit: int = 10):
    return generate_many(skip, limit, region, seed, mistakes)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=9191, reload=True)