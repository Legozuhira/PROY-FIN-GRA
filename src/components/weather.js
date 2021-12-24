import React from 'react';
import './styles.css';
import moment from 'moment';
import 'moment/locale/es';
import { Button } from 'semantic-ui-react';
import {
  faCloud,
  faBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faSmog,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function weather({weatherData}) {
  moment.locale('es');
  const WeatherIcon = styled.div`
  color: whitesmoke;
`;

  const refresh = () => {
    window.location.reload();
  }

  let weatherIcon = null;

  if (weatherData.weather[0].main === 'Thunderstorm') {
    weatherIcon = <FontAwesomeIcon icon={faBolt} />;
  } else if (weatherData.weather[0].main === 'Drizzle') {
    weatherIcon = <FontAwesomeIcon icon={faCloudRain} />;
  } else if (weatherData.weather[0].main === 'Rain') {
    weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
  } else if (weatherData.weather[0].main === 'Snow') {
    weatherIcon = <FontAwesomeIcon icon={faSnowflake} />;
  } else if (weatherData.weather[0].main === 'Clear') {
    weatherIcon = <FontAwesomeIcon icon={faSun} />;
  } else if (weatherData.weather[0].main === 'Clouds') {
    weatherIcon = <FontAwesomeIcon icon={faCloud} />;
  } else {
    weatherIcon = <FontAwesomeIcon icon={faSmog} />;
  }

  return (
    <div className="main">
      {/* <div className="top">
        <p className="header">{weatherData.name}</p>
        <Button className="button" inverted color='blue' circular icon='refresh' onClick={refresh} />
      </div> */}

      <div className="ContenedorClima">
          <div className="Izquierda">
          <p className="header">{weatherData.name}</p>
            <div className="Icono">
                <WeatherIcon style={{fontSize:30,color:'#5b1380'}}>{weatherIcon}</WeatherIcon>
            </div>
          </div>
          <div className="Derecha">
              <div className="flex">
                <p className="day">{moment().format("dddd")}, {<span>{moment().format('LL')}</span>}</p>
          
              </div>

              <div className="flex">
                <p className="temp">Temperatura: {weatherData.main.temp} &deg;C, </p>
                
              </div>
              <div className="flex">                
                <p className="temp">Humedad: {weatherData.main.humidity} %</p>
              </div>

              <div className="flex">
                <p className="sunrise-sunset">Amanecer: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
              </div>
              <div className="flex">
                <p className="sunrise-sunset">Atardecer: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
              </div>
          </div>
      </div>
 
  </div>
  )
}
