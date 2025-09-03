// app/(tabs)/discover.jsx
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import ChatBot from '../../components/ChatBot'; // ✅ Make sure this is default export

export default function DiscoverScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      fontFamily:'outfit-bold',
      headerTitle: 'Discover',
    });
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#ffffff' }}
      behavior={Platform.OS === 'ios' ? undefined : 'padding'}
      enabled
    >
      <View style={{ flex: 1 }}>
        <ChatBot />
      </View>
    </KeyboardAvoidingView>
  );
}
