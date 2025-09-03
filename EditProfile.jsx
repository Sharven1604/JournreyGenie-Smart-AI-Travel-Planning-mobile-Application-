import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, Image, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import { auth } from './../../configs/FirebaseConfig';
import { updateProfile, updateEmail } from "firebase/auth";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function EditProfile() {
  const user = auth.currentUser;
  const navigation = useNavigation();

  const [name, setName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);

      useEffect(()=>{
          navigation.setOptions({
              headerShown:true,
              headerTransparent:false,
              headerTitle:'Edit Profile'
          })})

  const handleSave = async () => {
    if (!name || !email) {
      Alert.alert("Error", "Name and email cannot be empty.");
      return;
    }

    setLoading(true);
    try {
      // Update Display Name
      await updateProfile(user, { displayName: name });

      // Update Email
      if (email !== user.email) {
        await updateEmail(user, email);
      }

      Alert.alert("Success", "Profile updated successfully!");
      navigation.goBack(); // Navigate back to Profile
    } catch (error) {
      Alert.alert("Update Failed", error.message);
    }
    setLoading(false);
  };

  
    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
          <ActivityIndicator size="large" color="#1E90FF" />
          <Text style={{ marginTop: 10, fontSize: 16, color: 'gray' }}>Loading profile...</Text>
        </View>
      );
    }

  return (
<LinearGradient colors={['#ffffff', '#ffffff']} style={{ flex: 1, alignItems: 'center', paddingTop: 50 }}>
      <View style={{
        backgroundColor: 'white',
        width: '85%',
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
        elevation: 5
      }}>
        <View style={{ width: 100, height: 100, borderRadius: 50, overflow: 'hidden', borderWidth: 2, borderColor: '#1c1c1c', marginBottom: 15 }}>
          <Image source={require('../../assets/images/logo.png')} style={{ width: '100%', height: '100%' }} />
        </View>
      <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#333' }}>Edit Profile</Text>

      <Text style={{ fontSize: 16, marginBottom: 5 }}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          padding: 10,
          borderRadius: 5,
          marginBottom: 15
        }}
      />

      <Text style={{ fontSize: 16, marginBottom: 5 }}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          padding: 10,
          borderRadius: 5,
          marginBottom: 20
        }}
      />

      <Button mode="contained" buttonColor="black" textColor="white" loading={loading} onPress={handleSave}>
        Save Changes
      </Button>
    </View>


    </LinearGradient>
    
  );
}
