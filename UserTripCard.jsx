import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import moment from 'moment'
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function UserTripCard({ trip }) {
  const formatData = (data) => {
    return JSON.parse(data);
  };

  const router = useRouter();
  const tripData = formatData(trip.tripData);

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: '/trip-details',
          params: {
            trip: JSON.stringify(trip),
          },
        })
      }
      style={{
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
      }}
    >
      <Image
        source={{
          uri:
            'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' +
            tripData.locationInfo?.photoRef +
            '&key=' +
            process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
        }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 15,
        }}
      />

      {/* ✅ This block ensures wrapping works */}
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <Text
          style={{
            fontFamily: 'outfit-medium',
            fontSize: 18,
            color: '#000',
            flexWrap: 'wrap',
          }}
        >
          {trip.tripPlan?.Location}
        </Text>

        <Text
          style={{
            fontFamily: 'outfit',
            fontSize: 14,
            color: Colors.GRAY,
            marginTop: 2,
          }}
        >
          {moment(tripData.startDate).format('DD MMM yyyy')}
        </Text>

        <Text
          style={{
            fontFamily: 'outfit',
            fontSize: 14,
            color: Colors.GRAY,
            marginTop: 2,
          }}
        >
          Traveling: {tripData.traveler?.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
