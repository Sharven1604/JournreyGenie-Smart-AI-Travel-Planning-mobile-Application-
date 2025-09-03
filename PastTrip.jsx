import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import moment from 'moment';
import UserTripCard from '../../components/MyTrips/UserTripCard';
import { useNavigation } from '@react-navigation/native';

export default function PastTripPage() {
  const { trips } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: false,
      headerTitle: 'Past Trips',
    });
  }, []);

  const userTrips = trips ? JSON.parse(trips) : [];

  // Get today's date
  const today = moment().startOf('day');

  // ✅ Filter only past trips
  const pastTrips = userTrips.filter((trip) => {
    try {
      const tripData =
        typeof trip.tripData === 'string'
          ? JSON.parse(trip.tripData)
          : trip.tripData;

      return tripData?.startDate && moment(tripData.startDate).isBefore(today);
    } catch (error) {
      console.warn('Invalid tripData:', error);
      return false;
    }
  });

  return (
    <ScrollView
      style={{
        padding: 20,
        paddingTop: 10,
        backgroundColor: '#fff',
        height: '100%',
      }}
    >
      {pastTrips.length === 0 ? (
        <Text
          style={{
            fontFamily: 'outfit',
            fontSize: 16,
            color: '#999',
            textAlign: 'center',
            marginTop: 20,
          }}
        >
          You have no past trips.
        </Text>
      ) : (
        pastTrips.map((trip, index) => (
          <UserTripCard trip={trip} key={index} />
        ))
      )}

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}
