import os
import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["GET"],
    allow_headers=["*"],
)

OULU_LAT = 65.0121
OULU_LON = 25.4651

@app.get("/api/weather")
async def get_weather():
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": OULU_LAT,
        "longitude": OULU_LON,
        "current_weather": "true",
    }

    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            req = await client.get(url, params=params)
            req.raise_for_status()
            data = req.json()

        return {
            "temperature": data["current_weather"]["temperature"],
            "windspeed": data["current_weather"]["windspeed"],
            "time": data["current_weather"]["time"],
            "weathercode": data["current_weather"]["weathercode"]
        }

    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=e.response.status_code,
            detail=f"Upstream weather API returned an error: {str(e)}"
        )

    except httpx.RequestError as e:
        raise HTTPException(
            status_code=503,
            detail=f"Weather API request failed: {str(e)}"
        )

    except KeyError:
        raise HTTPException(
            status_code=500,
            detail="Weather API returned unexpected structure"
        )
