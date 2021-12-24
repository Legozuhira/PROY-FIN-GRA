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

export default function imagen({ima}) {
  moment.locale('es');
  const WeatherIcon = styled.div`
  color: whitesmoke;
`;


  let weatherIcon = null;

  if (ima.weather[0].main === 'Thunderstorm') {
    weatherIcon = <img
    src='https://c0.wallpaperflare.com/preview/884/979/730/united-states-orlando-bolt-sky.jpg' />;
  } else if (ima.weather[0].main === 'Drizzle') {
    weatherIcon = <img
    src='https://p4.wallpaperbetter.com/wallpaper/1015/484/849/water-rain-drizzle-sky-wallpaper-preview.jpg' />;
  } else if (ima.weather[0].main === 'Rain') {
    weatherIcon = <img
    src='https://media.istockphoto.com/videos/heavy-rain-video-id454413420?s=640x640'/>;
  } else if (ima.weather[0].main === 'Snow') {
    weatherIcon =<img
    src='https://cdn.pixabay.com/photo/2014/01/07/18/34/snow-240076_640.jpg' />;
  } else if (ima.weather[0].main === 'Clear') {
    weatherIcon = <img 
    src='https://media.istockphoto.com/photos/sun-shining-in-clear-blue-sky-picture-id820483052?k=20&m=820483052&s=170667a&w=0&h=kJOlCH4W7DCg-tY9mJm4l5g37KRNCM3nW5N9Wqxr4Cc=' />;
  } else if (ima.weather[0].main === 'Clouds') {
    weatherIcon = <img 
    src="https://cdn.pixabay.com/photo/2016/07/21/14/02/sky-1532588_960_720.jpg"/>;
  } else {
    weatherIcon = <img 
    src="https://cdn.theatlantic.com/thumbor/3xTeif4F3DXzV9FgXAiiuYPWM9A=/900x544/media/img/photo/2013/01/chinas-toxic-sky/c01_59565822/original.jpg"/>;
  }

  return (
    <div className="contenedorimagen">
      {/* <div className="top">
        <p className="header">{ima.name}</p>
        <Button className="button" inverted color='blue' circular icon='refresh' onClick={refresh} />
      </div> */}
        {weatherIcon}
  </div>
  )
}
