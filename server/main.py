from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import requests

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
def get_weather():
    try:
        response = requests.get(f"https://api.open-meteo.com/v1/forecast?latitude={OULU_LAT}&longitude={OULU_LON}&current_weather=true")
        response.raise_for_status()
        data = response.json()
        
        return {
            "temperature": data["current_weather"]["temperature"],
            "windspeed": data["current_weather"]["windspeed"],
            "time": data["current_weather"]["time"],
            "weathercode": data["current_weather"]["weathercode"]
        }
    except requests.exceptions.RequestException as e:
        return JSONResponse(
            status_code=503,
            content={"error": "Sään haku epäonnistui", "details": str(e)}
        )
    except KeyError:
        return JSONResponse(
            status_code=500,
            content={"error": "Sään haku epäonnistui", "details": "Väärä API-key"}
        )
