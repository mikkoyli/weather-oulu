import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5001/api/weather")
      .then((res) => {
        if (!res.ok) throw new Error(`Palvelin palautti virheen: ${res.status}`);
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

  const getWeatherDescription = (code) => {
    switch (code) {
      case 0: return "Selkeää";
      case 1:
      case 2:
      case 3: return "Osittain pilvistä";
      case 45:
      case 48: return "Sumua";
      case 51:
      case 53:
      case 55: return "Tihkusadetta";
      case 61:
      case 63:
      case 65: return "Sadetta";
      case 71:
      case 73:
      case 75: return "Lunta";
      case 95:
      case 96:
      case 99: return "Ukkosta";
      default: return "Tuntematon";
    }
  };

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
