import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { CreateTripContext } from '../context/CreateTripContext';
import { useEffect, useState } from "react";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync(); // Prevent splash screen from hiding before fonts load

export default function RootLayout() {
  const [tripData, setTripData] = useState([]);

  const [fontsLoaded] = useFonts({
    'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf'),
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); // Hide splash when fonts are ready
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Prevent UI from rendering until fonts are loaded
  }

  return (
    <CreateTripContext.Provider value={{ tripData, setTripData }}>
      <Stack screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </CreateTripContext.Provider>
  );
}
