from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import httpx

app = FastAPI()

# CORS for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Don't do this in production
    allow_methods=["*"],
    allow_headers=["*"],
)

# Oulu coordinates
OULU_LAT = 65.0121
OULU_LON = 25.4651

@app.get("/api/weather")
async def get_weather():
    url = (
        f"https://api.open-meteo.com/v1/forecast?"
        f"latitude={OULU_LAT}&longitude={OULU_LON}&current_weather=true"
    )

    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        response.raise_for_status()
        data = response.json()

    current = data.get("current_weather", {})
    return {
        "place": "Oulu",
        "time": current.get("time"),
        "temperature": current.get("temperature"),
        "windspeed": current.get("windspeed"),
        "weathercode": current.get("weathercode")
    }
