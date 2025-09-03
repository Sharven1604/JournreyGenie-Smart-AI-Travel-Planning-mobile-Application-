import { View, Text, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';

export default function FlightInfo({ flightData }) {
  const handleBookingPress = () => {
    if (flightData.bookingUrl) {
      // ✅ Split URLs & pick the first valid one
      const urls = flightData.bookingUrl.split(',').map(url => url.trim());
      const firstUrl = urls.length > 0 ? urls[0] : null;

      if (firstUrl) {
        Linking.openURL(firstUrl).catch(err =>
          console.error("Failed to open URL", err)
        );
      } else {
        console.warn("No valid booking URL found.");
      }
    }
  };

  return (
    <View style={{
      marginTop: 20,
      borderWidth: 1,
      borderColor: Colors.LIGHT_GRAY,
      padding: 10,
      borderRadius: 15
    }}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 20
        }}>✈️ Flights</Text>
        <TouchableOpacity 
          style={{
            backgroundColor: Colors.PRIMARY,
            padding: 5,
            width: 100,
            borderRadius: 7,
            marginTop: 7
          }}
          onPress={handleBookingPress}
        >
          <Text style={{
            textAlign: 'center',
            color: Colors.WHITE,
            fontFamily: 'outfit',
          }}>Book Here</Text>
        </TouchableOpacity>
      </View>

      <Text style={{
    fontFamily: 'outfit',
    fontSize: 17,
    marginTop: 7
}}>Airline: {flightData.flightName}</Text>

<Text>{"\n"}</Text>

<Text style={{
    fontFamily: 'outfit',
    fontSize: 17
}}>Price: {flightData.price}</Text>

    </View>
  );
}
