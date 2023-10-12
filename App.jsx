import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Image, StyleSheet, View } from 'react-native';
import CurrentWeather from './components/CurrentWeather';
import SearchWeather from './components/SearchWeather';
import config from './config';
import Background from './assets/Wallpaper.png';
import Background2 from './assets/Wallpaper2.png';

export default function App() {
  const [toggleSearch, setToggleSearch] = useState('city');
  const [city, setCity] = useState('Manchester');
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [weather, setWeather] = useState({});

  
  const fetchWeatherByCity = () => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${config.API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setLat(data.coord.lat);
        setLong(data.coord.lon);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data by city:", error);
      });
  };

  // Event handler for fetching data by city
  // const fetchLatLongHandler = () => {
  //   fetch(
  //     `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${config.API_KEY}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setLat(data.coord.lat);
  //       setLong(data.coord.lon);
  //       console.log(data);
  //     });
  // };

  // Event handler for fetching data by postal code
  const fetchByPostcodeHandler = () => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?key=${config.GOOGLE_KEY}&components=postal_code:${city}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "OK" && data.results && data.results[0] && data.results[0].geometry) {
          setLat(data.results[0].geometry.location.lat);
          setLong(data.results[0].geometry.location.lng);
          console.log("Geocoding data retrieved:", data);
        } else {
          console.log("No geocoding data found in the response:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching geocoding data:", error);
      });
  };

  // Update weather info when location change (lat, long)
  useEffect(() => {
    if (lat !== undefined && long !== undefined) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${config.API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeather(data);
          console.log(data);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }, [lat, long]);

  return (
    <ImageBackground blurRadius={30} source={Background} style={styles.background}>
    <View style={styles.container}>
      {/* Pass props to SearchWeather */}
      <SearchWeather
        city={city}
        setCity={setCity}
        toggleSearch={toggleSearch}
        setToggleSearch={setToggleSearch}
        fetchWeatherByCity={fetchWeatherByCity}
        fetchByPostcodeHandler={fetchByPostcodeHandler}
      />
      {/* Pass props to CurrentWeather */}
      <CurrentWeather currentWeather={weather} timezone={weather.timezone} />
      {/* Status bar */}
      <StatusBar style="light" />
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
});
