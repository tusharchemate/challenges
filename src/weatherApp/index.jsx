import { useState } from "react";

const WeatherApp1 = () => {
  const [city, setCity] = useState("Pune");
  const [summary, setSummary] = useState({});

  // fetch weather
  const fetchWeather = async (city) => {
    const apiKey = "ePo6tKTwQ7EhBu0NL7TfNCDUjfQTXbiO";
    const url = `https://api.tomorrow.io/v4/weather/forecast?location=${city}&apikey=${apiKey}`;

    try {
      await fetch(url)
        .then((response) => response.json())
        .then((response) =>
          setSummary({
            ...response.timelines.daily[0].values,
            ...response.location,
          })
        );
    } catch (err) {
      console.log(err);
    }
  };

  const onCityChange = () => {
    city && fetchWeather(city);
  };

  return (
    <>
      <input
        type="text"
        name="city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <div className="Summary">
        {summary.name ? (
          <>
            <h2> Avg : {summary.temperatureAvg} %</h2>
            <h2> Max: {summary.temperatureMax} %</h2>
            <h2> Min : {summary.temperatureMin} %</h2>
            <h2> Name : {summary.name} </h2>
          </>
        ) : (
          <p> Please Enter City Name</p>
        )}
      </div>
      <button onClick={onCityChange}> Get Weather </button>
    </>
  );
};

export default WeatherApp1;
