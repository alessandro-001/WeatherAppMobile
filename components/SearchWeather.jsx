import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const SearchWeather = ({
  toggleSearch,
  setToggleSearch,
}) => {
  const setToggleByCity = () => {
    setToggleSearch("city");
  };

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
          accessibilityLabel="Search Weather By City"
          onPress={setToggleByCity}
        />
        <Button
          title="Postcode"
          color={toggleSearch === "postcode" ? "white" : "rgba(255, 255, 255, 0.6)"}
          accessibilityLabel="Search Weather By ZIP/Postal Code"
          onPress={setToggleByPostCode}
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
