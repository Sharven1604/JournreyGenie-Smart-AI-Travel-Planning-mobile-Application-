import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import PlaceCard from './PlaceCard';

export default function PlannedTrip({ details }) {
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0); // Track selected plan

  return (
    <View style={{ marginTop: 20 }}>
      {/* Title */}
      <Text style={{ fontSize: 20, fontFamily: 'outfit-bold' }}>
        🏕️ All Planned Trips
      </Text>

      {/* 🔹 Display Plan Selection Buttons */}
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        {details.map((plan, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedPlanIndex(index)}
            style={{
              backgroundColor: selectedPlanIndex === index ? 'black' : '#7a7a7a',
              padding: 10,
              borderRadius: 10,
              marginRight: 10,
            }}
          >
            <Text style={{ color: 'white', fontSize: 16 }}>
              ✈️ Plan {index + 1}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 🔹 Display Selected Plan's Itinerary */}
      {details[selectedPlanIndex]?.days?.map((day, dayIndex) => (
        <View key={dayIndex} style={{ marginTop: 15 }}>
          {/* Display Day Number */}
          <Text style={{
            fontFamily: 'outfit-medium',
            fontSize: 18,
            marginBottom: 5
          }}>
            📅 Day {day.day}
          </Text>

          {/* 🔹 Loop through places in that day's plan */}
          {day.places?.map((place, index) => (
            <PlaceCard key={`${place.placeName}-${index}`} placeData={place} />
          ))}
        </View>
      ))}
    </View>
  );
}
