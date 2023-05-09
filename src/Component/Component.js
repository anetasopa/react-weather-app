import { useState } from 'react';
import image from '../images/weather.png';
import styles from './component.module.css';

// API KEY AND URL
const apiKey = '4dc26f5af42150a38a0eb90b62606d2a';
const apiUrl = 'https://api.openweathermap.org/data/2.5/';

function Component() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    if (e.key === 'Enter') {
      await fetch(`${apiUrl}weather?q=${query}&appid=${apiKey}&units=metric`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery('');
        });
    }
  };

  const openWeather = () => {
    setWeather(weather);
  };

  return (
    <div>
      <img src={image} alt="" className={styles.img} />

      <div className={styles.container} />
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={styles.block}>
          <label htmlFor="weather">Write the location</label>
          <input
            id="weather"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        <button onClick={openWeather}>SEARCH</button>
      </form>
      {typeof weather.main !== 'undefined' ? (
        <>
          <span className={styles.name}>{weather.name}</span>
          <img
            className={styles.icon}
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Icon"
          />
          <span className={styles.temp}>{Math.round(weather.main.temp)}°</span>
        </>
      ) : (
        <span>Please write a city name</span>
      )}
    </div>
  );
}

export default Component;
