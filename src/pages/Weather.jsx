import { useLocation, useNavigate } from "react-router";

export default function Weather() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location?.state || {};
  console.log(data);
  const {
    apparent_temperature,
    cloud_cover,
    is_day,
    rain,
    relative_humidity_2m,
    temperature_2m,
    weather_code,
    wind_speed_10m,
    wind_direction_10m,
  } = data;
  return (
    <div>
      <div className="weather-card">
        <div className="weather-header">
          <span className="weather-icon">☁️</span>
          <div>
            <h3>
              {weather_code === 3
                ? "Overcast"
                : weather_code === 0
                  ? "Clear"
                  : "Partly Cloudy"}
            </h3>
            <span className="weather-time">
              {is_day ? "☀️ Day" : "🌙 Night"}
            </span>
          </div>
        </div>

        <div className="weather-temp">
          {temperature_2m}°C
          <span className="feels-like">
            Feels like {apparent_temperature}°C
          </span>
        </div>

        <div className="weather-grid">
          <div className="weather-item">
            <span>💧 Humidity</span>
            <strong>{relative_humidity_2m}%</strong>
          </div>
          <div className="weather-item">
            <span>🌧️ Rain</span>
            <strong>{rain} mm</strong>
          </div>
          <div className="weather-item">
            <span>☁️ Clouds</span>
            <strong>{cloud_cover}%</strong>
          </div>
          <div className="weather-item">
            <span>💨 Wind</span>
            <strong>
              {wind_speed_10m} m/s ({wind_direction_10m}°)
            </strong>
          </div>
        </div>
      </div>

      <button onClick={() => navigate(-1)} className="go-back-button">
        Go Back
      </button>
    </div>
  );
}
