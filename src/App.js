import './App.css';
import React, { useEffect, useState } from "react";
import { Dimmer, Loader } from 'semantic-ui-react';
import Weather from './components/weather';
import Forecast from './components/forecast';
import Imagen from './components/imagen'
export default function App() {
  
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
      //navigator.geolocation.getCurrentPosition(function(position) {
        setLat(8.987255);
      
        //console.log(position.coords.latitude);
        setLong(-79.516017);
        //console.log(position.coords.longitude);
     // });
    
      getWeather(8.987255, -79.516017)
      .then(weather => {
        setWeatherData(weather);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      });

      getForecast(8.987255, -79.516017)
        .then(data => {
          setForecast(data);
          setError(null);
        })
        .catch(err => {
          setError(err.message);
        });

  }, [lat,long,error])

  function handleResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Please Enable your Location in your browser!");
    }
  }

  function getWeather(lat, long) {
    return fetch(
      `${process.env.REACT_APP_API_URL}/weather?lat=${lat}&lon=${long}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then(res => handleResponse(res))
      .then(weather => {
        if (Object.entries(weather).length) {
          const mappedData = mapDataToWeatherInterface(weather);
          console.log(mappedData);
          return mappedData;
        }
      });
  }
  
  function getForecast(lat, long) {
    return fetch(
      `${process.env.REACT_APP_API_URL}/forecast?lat=${lat}&lon=${long}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then(res => handleResponse(res))
      .then(forecastData => {
        if (Object.entries(forecastData).length) {
          return forecastData.list
            .filter(forecast => forecast.dt_txt.match(/09:00:00/))
            .map(mapDataToWeatherInterface);
        }
      });
  }

  function mapDataToWeatherInterface(data) {
    console.log(data);
    const mapped = {
      date: data.dt * 1000, // convert from seconds to milliseconds
      description: data.weather[0].main,
      temperature: Math.round(data.main.temp),
      main: data.weather[0].main,
      wt:data
    };
  
    // Add extra properties for the five day forecast: dt_txt, icon, min, max
    if (data.dt_txt) {
      mapped.dt_txt = data.dt_txt;
    }
  
    return mapped;
  }
  
  return (
    <div className="App">
      <div className="barra">
        <p className="header">TIEMPONOTI</p>
      </div>
      {(typeof weatherData.main != 'undefined') ? (
        <div className="Contenedor">
            <div className="Clima">
              <Weather weatherData={weatherData.wt}/>
              <Forecast forecast={forecast} weatherData={weatherData}/>
            </div>
            <div className="Imagen">
              <Imagen ima={weatherData.wt} />
              
          </div>
      </div>
        
      ): (
        <div>
          <Dimmer active>
            <Loader>Cargando Informacion..</Loader>
          </Dimmer>
        </div>
      )}
    </div>
  );
}
