import { useState } from 'react';
import image from '../images/weather.png';
import styles from './component.module.css';

const apiUrl = 'https://api.openweathermap.org/data/2.5/';

function Component() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    await fetch(
      `${apiUrl}weather?q=${query}&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric`,
    )
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setQuery('');
      });
  };

  return (
    <div>
      <img src={image} alt="" className={styles.img} />
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={styles.block}>
          <label htmlFor="weather">Write the location</label>
          <input
            id="weather"
            placeholder="Search..."
            onChange={(e) => setQuery(e.currentTarget.value)}
            value={query}
          />
        </div>
        <button onClick={search}>SEARCH</button>
      </form>
      {typeof weather.main !== 'undefined' ? (
        <div className={styles.result}>
          <span className={styles.name}>{weather.name}</span>
          <img
            className={styles.icon}
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Icon"
          />
          <span className={styles.temp}>{Math.round(weather.main.temp)}°</span>
        </div>
      ) : (
        <span>Please write a city name</span>
      )}
    </div>
  );
}

export default Component;
