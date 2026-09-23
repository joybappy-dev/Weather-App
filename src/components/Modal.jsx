import { useState } from "react";
import { useNavigate } from "react-router";

function Modal({ isModalOpen, setIsModalOpen }) {
  const [cityName, setCityName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // fetch cordinates
  async function getCordinates(cityName) {
    try {
      setLoading(true);
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&countryCode=BD&format=json`,
      );
      const data = await response.json();
      if (!data.results) {
        throw new Error("location not found!");
      }
      const cityInfo = data?.results[0];
      const { name, latitude, longitude } = cityInfo;

      return { name, latitude, longitude };
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  // fetch weather api
  async function getWeather(lat, long) {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,rain,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&forecast_days=1`,
      );
      const data = await res.json();
      return data?.current;
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  // load weather data
  async function handleGetWeather(cityName) {
    try {
      const data = await getCordinates(cityName);
      if (!data) {
        throw new Error("location not found!");
      }
      const currentWeather = await getWeather(data.latitude, data.longitude);
      console.log(currentWeather);
      navigate("/weather", {state: currentWeather});
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className={`modal ${isModalOpen ? "show-modal" : "hide-modal"}`}>
      <form className="input-form">
        <div className="input-form-top">
          <div></div>
          <h3>Joy Weather</h3>
          <p onClick={() => setIsModalOpen(false)} className="cross-button">
            X
          </p>
        </div>

        <div className="input-form-bottom">
          <input
            onChange={(e) => setCityName(e.target.value)}
            className="city-input"
            type="text"
            placeholder="Enter your city name"
          />

          <div className="or">Or</div>

          <button type="button" className="use-location-button">
            Use Location
          </button>

          <button
            onClick={() => handleGetWeather(cityName)}
            type="button"
            className="get-button"
          >
            {loading ? "Loading..." : "Get Weather"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Modal;
