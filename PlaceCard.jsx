import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { GetPhotoRef } from '../../services/GooglePlaceApi';

export default function PlaceCard({ placeData }) {
  const [photoRef,setPhotoRef]=useState();
  useEffect(()=>{
      GetGooglePhotoRef();
  },[])
  
  const GetGooglePhotoRef=async()=>{
      const result= await GetPhotoRef(placeData?.placeName);
      setPhotoRef(result);
     }

  const openGoogleMaps = () => {
    if (!placeData?.geoCoordinates) {
      console.error('No geoCoordinates available for this place');
      return;
    }
    const { latitude, longitude } = placeData.geoCoordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

    Linking.openURL(url).catch(err => console.error('Error opening Google Maps:', err));
  };

  return (
    <View style={{
      backgroundColor: Colors.LIGHT_BLUE,
      padding: 15,
      borderRadius: 15,
      borderColor: Colors.GRAY,
      marginTop: 20,
    }}>
      {/* Display Place Image */}
      <Image 
      source={{uri:
        'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='
        +photoRef
        +'&key='+process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}}
           style={{
               width:'100%',
               height:140,
               borderRadius:15
           }}
       />

      <View style={{ marginTop: 10 }}>
        {/* Display Place Name */}
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 20
        }}>
          {placeData?.placeName || 'Unknown Place'}
        </Text>

        {/* Display Place Details */}
        <Text style={{
          fontFamily: 'outfit',
          fontSize: 14,
          color: Colors.GRAY,
          marginBottom: 5
        }}>
          {placeData?.placeDetails || 'No details available'}
        </Text>

        {/* Best Time to Visit */}
        {placeData?.bestTimeToVisit && (
          <Text style={{ fontFamily: 'outfit', fontSize: 16, marginTop: 5 }}>
            🌅 Best Time to Visit:  
            <Text style={{ fontFamily: 'outfit-bold' }}> {placeData.bestTimeToVisit}</Text>
          </Text>
        )}

        {/* Ticket Price */}
        {placeData?.ticketPricing && (
          <Text style={{ fontFamily: 'outfit', fontSize: 16, marginTop: 5 }}>
            🎟️ Ticket Price:  
            <Text style={{ fontFamily: 'outfit-bold' }}> {placeData.ticketPricing}</Text>
          </Text>
        )}

        {/* Time to Travel */}
        {placeData?.timeToTravel && (
          <Text style={{ fontFamily: 'outfit', fontSize: 16, marginTop: 5 }}>
            ⏱️ Travel Time:  
            <Text style={{ fontFamily: 'outfit-bold' }}> {placeData.timeToTravel}</Text>
          </Text>
        )}

        {/* Open Google Maps Button */}
        <TouchableOpacity
          onPress={openGoogleMaps}
          style={{
            marginTop: 10,
            paddingVertical: 10,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 10,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>
            📍 Open in Google Maps
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
