import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/weather")
      .then((res) => {
        if (!res.ok) throw new Error(`Sääpalvelin palautti virheen: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

    const WEATHER_TEXT = {
    0: "Selkeää",
    1: "Osittain pilvistä",
    2: "Osittain pilvistä",
    3: "Osittain pilvistä",
    45: "Sumua",
    48: "Sumua",
    51: "Tihkusadetta",
    53: "Tihkusadetta",
    55: "Tihkusadetta",
    61: "Sadetta",
    63: "Sadetta",
    65: "Sadetta",
    71: "Lunta",
    73: "Lunta",
    75: "Lunta",
    95: "Ukkosta",
    96: "Ukkosta",
    99: "Ukkosta",
  };

  const getWeatherDescription = (code) => WEATHER_TEXT[code] || "Tuntematon";

  if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Ladataan säätietoja...</p>;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
      }}
    >
      <div
        style={{
          padding: "30px 50px",
          background: "#ffffff",
          borderRadius: "15px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          textAlign: "center",
          minWidth: "320px",
          marginTop: "50px",
          marginLeft: "50px"
        }}
      >
        {error ? (
          <p style={{ color: "red" }}>Virhe: {error}</p>
        ) : (
          <>
            <h1>Oulu</h1>
            <p><strong>Aika:</strong> {weather.time}</p>
            <p><strong>Lämpötila:</strong> {weather.temperature} °C</p>
            <p><strong>Tuulen nopeus:</strong> {weather.windspeed} m/s</p>
            <p><strong>Sää:</strong> {getWeatherDescription(weather.weathercode)}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
