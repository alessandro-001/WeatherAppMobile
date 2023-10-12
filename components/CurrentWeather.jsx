import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

const CurrentWeather = ({ currentWeather }) => {
  if (!currentWeather || !currentWeather.weather || !currentWeather.weather[0] || !currentWeather.main) {
    console.log('Invalid:', currentWeather);
    return <Text>Loading...</Text>;
  }

  console.log(currentWeather);

  return (
    <View style={styles.container}>
    <Text style={styles.cityName}>{currentWeather.name}</Text>
    <View style={styles.mainInfo}>
      {currentWeather.weather && currentWeather.weather[0] && (
        <Image
          source={{
            uri: `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`,
          }}
          style={styles.weatherIcon}
        />
      )}
      <Text style={styles.weatherDetails}>
        Temperature: {Math.round(currentWeather.main && currentWeather.main.temp - 273.15)}°C
      </Text>
      <Text style={styles.weatherDetails}>{currentWeather.weather[0].description}</Text>
    </View>
  
    <View style={styles.secondaryInfo}>
      <View style={styles.rows}>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Feels</Text>
          <Text style={styles.weatherDetails}>
            {Math.round(currentWeather.main && currentWeather.main.feels_like - 273.15)}°C
          </Text>
        </View>
  
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Min</Text>
          <Text style={styles.weatherDetails}>
            {Math.round(currentWeather.main && currentWeather.main.temp_min - 273.15)}°C
          </Text>
        </View>
  
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Max</Text>
          <Text style={styles.weatherDetails}>
            {Math.round(currentWeather.main && currentWeather.main.temp_max - 273.15)}°C
          </Text>
        </View>
      </View>
  
      <View style={styles.rows}>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Wind</Text>
          <Text style={styles.weatherDetails}>
            {currentWeather.wind.speed} m/s
          </Text>
        </View>
      

      
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Humidity</Text>
          <Text style={styles.weatherDetails}>
            {currentWeather.main.humidity} %
          </Text>
        </View>
      </View>


    </View>
  </View>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rows: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  detailContainer: {
    flex: 1,
    alignItems: 'center',
  },
  weatherDetails: {
    color: 'black',
    textAlign: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  cityName: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 20,
  }
});

export default CurrentWeather;
