import React from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';

const SearchWeather = ({
  toggleSearch,
  setToggleSearch,
  city,
  setCity,
  postCode,
  setPostCode,
  fetchLatLongHandler,
  fetchByPostcodelHandler,
}) => {

    // Event handler for the form submission
    const handleSubmit = (e) => {
        if (toggleSearch === "city") {
            fetchLatLongHandler(); // Fetch data by city
        }
        if (toggleSearch === "postcode") {
            fetchByPostcodelHandler(); // Fetch data by postcode
        }
    };

    // Set the search mode to city
    const setToggleByCity = () => {
        setToggleSearch("city");
    };

    // Set the search mode to postcode
    const setToggleByPostCode = () => {
        setToggleSearch("postcode");
    };

  return (
    <View style={styles.container}>
      <Text style={styles.buttonLbl}>Search by: </Text>
      <View style={styles.search}>
        <Button
            title="City"
            color={toggleSearch === "city" ? "white" : "rgba(255, 255, 255, 0.6)"}
            accessibilityLabel="Search weather by city"
            onPress={setToggleByCity}
        />
        <Button
            title="Postcode"
            color={toggleSearch === "postcode" ? "white" : "rgba(255, 255, 255, 0.6)"}
            accessibilityLabel="Search weather by postcode"
            onPress={setToggleByPostCode}
        />
        <TextInput
            onChangeText={toggleSearch === "city" ? setCity : setPostCode}
            value={toggleSearch === "city" ? city : postCode}
            placeholder={
              toggleSearch === "city" ? "City Name" : "Postcode"
            }
            onSubmitEditing={handleSubmit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 60,
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 15,
  },
  search: {
    flexDirection: 'row',
  },
  buttonLbl: {
    color: 'black',
    marginRight: 10,
  },
});

export default SearchWeather;
