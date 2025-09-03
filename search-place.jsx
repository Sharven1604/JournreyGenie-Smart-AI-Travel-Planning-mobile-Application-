import { View, ImageBackground, TouchableOpacity, Text } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { useNavigation, useRouter } from 'expo-router';

const GOOGLE_MAP_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY; // ✅

import { Colors } from '../../constants/Colors';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { CreateTripContext } from './../../context/CreateTripContext';
import { Ionicons } from '@expo/vector-icons'; // ✅ Import back icon

export default function SearchPlace() {
  const navigation = useNavigation();
  const router = useRouter();
  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: false,
      headerTitle: 'Search',
    });
  }, [navigation]);

  const goBackToMyTrip = () => {
    router.replace('/(tabs)/mytrip'); // ✅ Navigate back to My Trip
  };

  return (
    <ImageBackground
      source={require('../../assets/images/mapp.jpg')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View
        style={{
          flex: 1,
          padding: 25,
          paddingTop: 50,
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
        }}
      >
        <GooglePlacesAutocomplete
          placeholder="Search for a place..."
          fetchDetails={true}
          onPress={(data, details = null) => {
            console.log('Selected Place:', data, details);
            if (details) {
              setTripData({
                ...tripData,
                locationInfo: {
                  name: data.description,
                  coordinates: details.geometry.location,
                  photoRef: details?.photos[0]?.photo_reference,
                  url: details?.url,
                },
              });
            }
            router.push('/create-trip/select-traveler');
          }}
          query={{
            key: GOOGLE_MAP_KEY, // ✅ Fixed here
            language: 'en',
          }}
          styles={{
            textInputContainer: {
              width: '100%',
            },
            textInput: {
              height: 44,
              color: '#333',
              fontSize: 16,
              borderRadius: 5,
              borderColor: '#ddd',
              borderWidth: 1,
              paddingLeft: 10,
              backgroundColor: '#fff',
            },
          }}
        />

        {/* ✅ Bottom Back Button */}
        <TouchableOpacity
          onPress={goBackToMyTrip}
          style={{
            position: 'absolute',
            bottom: 60,
            left: 25,
            right: 25,
            backgroundColor: Colors.PRIMARY,
            paddingVertical: 12,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="arrow-back" size={22} color={Colors.WHITE} style={{ marginRight: 5 }} />
          <Text style={{ color: Colors.WHITE, fontSize: 18, fontWeight: 'bold' }}>Back to My Trip</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
