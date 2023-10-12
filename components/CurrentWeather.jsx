import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

const CurrentWeather = ({ currentWeather }) => {
  if (!currentWeather || !currentWeather.weather || !currentWeather.weather[0] || !currentWeather.main) {
    console.log('Invalid:', currentWeather);
    return <Text style={{marginTop: 50, color: 'lightblue'}}>Please enter a city...</Text>;
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
        {Math.round(currentWeather.main && currentWeather.main.temp - 273.15)}°C
      </Text>
      <Text style={styles.weatherDetails}>{currentWeather.weather[0].description}</Text>
    </View>
  
    <View style={styles.secondaryInfo}>
      <View style={styles.rows}>

        {/* Feels like */}
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Feels</Text>
          <Text style={styles.weatherDetails}>
            {Math.round(currentWeather.main && currentWeather.main.feels_like - 273.15)}°C
          </Text>
        </View>
        {/* Min temperature */}
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Min</Text>
          <Text style={styles.weatherDetails}>
            {Math.round(currentWeather.main && currentWeather.main.temp_min - 273.15)}°C
          </Text>
        </View>
        {/* Max temperature */}
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Max</Text>
          <Text style={styles.weatherDetails}>
            {Math.round(currentWeather.main && currentWeather.main.temp_max - 273.15)}°C
          </Text>
        </View>
      </View>
      {/* wind speed */}
      <View style={styles.rows}>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Wind</Text>
          <Text style={styles.weatherDetails}>
            {currentWeather.wind.speed} m/s
          </Text>
        </View>
        {/* humidity */}
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Humidity</Text>
          <Text style={styles.weatherDetails}>
            {currentWeather.main.humidity} %
          </Text>
        </View>
        {/* pressure */}
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Pressure</Text>
          <Text style={styles.weatherDetails}>
            {currentWeather.main.pressure} mbar
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
    justifyContent: 'top',
  },
  rows: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  detailContainer: {
    flex: 1,
    alignItems: 'center',
  },
  weatherDetails: {
    color: 'lightblue',
    textAlign: 'center',
    marginVertical: 5,
    fontSize: 20
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  weatherIcon: {
    width: 150,
    height: 100,
  },
  cityName: {
    marginTop: 50,
    fontWeight: 'bold',
    fontSize: 20,
    color: 'lightblue'
  },
  // detailsBox: {
  //   borderColor: 'lightblue', // Border color
  //   borderWidth: 1, // Border width
  //   borderRadius: 20, // Border radius
  //   paddingHorizontal: 10, // Adjust this as needed
  //   margin: 10, // Add margin to separate from other content
  // }
});

export default CurrentWeather;
