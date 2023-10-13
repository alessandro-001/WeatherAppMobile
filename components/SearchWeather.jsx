import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const SearchWeather = ({ toggleSearch, setToggleSearch, city, setCity, fetchWeatherByCity }) => {
  
    const handleSearch = () => {
        if (city) {
        fetchWeatherByCity();
        }
    };

//   const setToggleByCity = () => {
//     setToggleSearch('city');
//   };

  return (
    <View style={styles.container}>
      <Text style={styles.buttonLbl}>Search by City: </Text>
      <View style={styles.search}>
        <TextInput
          style={[styles.input, { fontWeight: 'normal' }]}
          onChangeText={setCity}
          value={city}
          placeholder="Enter City Name..."
          placeholderTextColor='lightblue'
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  search: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10, 
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'lightblue',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    paddingLeft: 10,
    fontWeight: 'bold',
    color: 'lightblue'
  },
  button: {
    backgroundColor: 'lightblue',
    borderRadius: 5,
    borderColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold'
  },
  buttonLbl: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
    padding: 10,
    color: 'lightblue'
  },
  
});

export default SearchWeather;
