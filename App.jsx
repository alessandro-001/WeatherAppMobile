import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, ImageBackground } from 'react-native'
import CurrentWeather from './components/CurrentWeather';
import DailyWeather from './components/DailyWeather';
import SearchWeather from './components/SearchWeather';
import config from './config';

export default function App() {
  const [toggleSearch, setToggleSearch] = useState('city');
  const [city, setCity] = useState ('Manchester');
  const [postCode, setPostCode] = useState('');
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [weather, setWeather] = useState({});

  const controller = new AbortController();
  const signal = controller.signal;

  //fetch latitude and longitude by city
  const fetchLatLongHandler = () => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${config.API_KEY}`
    )
    .then((res) => res.json())
    .then((data) => {
      setLat(data.coord.lat);
      setLong(data.coord.lon);
    });
  }

  //fetch latitude and longitude by postcode
  const fetchByPostcodelHandler = () => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?key=${config.GOOGLE_KEY}&components=postal_code:${postalCode}`
    )
    .then((res) => res.json())
    .then((data) => {
      setLat(data.results[0].geometry.location.lat);
      setLong(data.results[0].geometry.location.lng);
    });
  };

  //update weather info when location change (lat, long)
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&units=metric&appid=${config.API_KEY}`,
      { signal }
    )
    .then((res) => res.json())
    .then((data) => {
      setWeather(data);
    })
    .catch((err) => {
      console.log("error", err);
    });
    return () => controller.abort();
  }, [lat, long]);


  return (
    <>
      <View style={styles.container}>
        {/* passing props to SearchWeather */}
        <SearchWeather
          city={city}
          setCity={setCity}
          fetchLatLongHandler={fetchLatLongHandler}
          toggleSearch={toggleSearch}
          setToggleSearch={setToggleSearch}
          fetchByPostcodelHandler={fetchByPostcodelHandler}
          setPostCode={setPostCode}
          postCode={postCode}
        />
        <StatusBar style="auto" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
