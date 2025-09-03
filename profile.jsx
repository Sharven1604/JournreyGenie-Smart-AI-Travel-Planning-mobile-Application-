// components/profile.jsx (Final version with re-authentication for password change)

import { View, Text, TouchableOpacity, Image, Alert, ActivityIndicator, Modal, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { signOut, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth, db } from './../../configs/FirebaseConfig';
import { Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userTrips, setUserTrips] = useState([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      fetchUserTrips(currentUser.email);
    } else {
      router.replace('/auth/sign-in');
    }
    setLoading(false);
  }, []);

  const fetchUserTrips = async (email) => {
    try {
      const q = query(collection(db, 'UserTrips'), where('userEmail', '==', email));
      const querySnapshot = await getDocs(q);
      const trips = [];
      querySnapshot.forEach((doc) => {
        trips.push(doc.data());
      });
      setUserTrips(trips);
    } catch (error) {
      console.error("Error fetching user trips:", error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          onPress: async () => {
            try {
              await signOut(auth);
              router.replace('/auth/sign-in');
            } catch (error) {
              console.error("Logout error:", error);
            }
          },
        },
      ]
    );
  };

  const handleChangePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return;
    }
    if (!currentPassword) {
      Alert.alert("Error", "Please enter your current password.");
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);
      Alert.alert("Success", "Password updated successfully.", [
        {
          text: "OK",
          onPress: () => {
            setShowPasswordModal(false);
            setNewPassword('');
            setCurrentPassword('');
            router.replace('/auth/sign-in');
          },
        },
      ]);
    } catch (error) {
      console.error("Password change error:", error);
      Alert.alert("Error", "Re-authentication failed. Please try again.");
    }
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
    <LinearGradient colors={['#ffffff', '#ffffff']} style={{ flex: 1, alignItems: 'center', paddingTop: 30 }}>
      <View style={{
        backgroundColor: 'white',
        width: '85%',
        padding: 30,
        borderRadius: 15,
        alignItems: 'center',
        elevation: 5
      }}>
        <View style={{ width: 100, height: 100, borderRadius: 50, overflow: 'hidden', borderWidth: 2, borderColor: '#1c1c1c', marginBottom: 15 }}>
          <Image source={require('../../assets/images/logo.png')} style={{ width: '100%', height: '100%' }} />
        </View>

        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#333' }}>
          {user?.displayName || "Guest User"}
        </Text>

        <Text style={{ fontSize: 16, color: 'gray', marginBottom: 20 }}>
          {user?.email}
        </Text>

        <Button
          mode="contained"
          buttonColor="black"
          textColor="white"
          onPress={() => router.push('/Profile/EditProfile')}
          style={{ marginBottom: 20, width: 270 }}
        >
          Edit Profile
        </Button>

        <Button
          mode="contained"
          buttonColor="black"
          textColor="white"
          onPress={() => router.push({ pathname: '/Profile/UpComingTrip', params: { trips: JSON.stringify(userTrips) } })}
          style={{ marginBottom: 20, width: 270 }}
        >
          📅 Upcoming Trips
        </Button>

        <Button
          mode="contained"
          buttonColor="black"
          textColor="white"
          onPress={() => router.push({ pathname: '/Profile/PastTrip', params: { trips: JSON.stringify(userTrips) } })}
          style={{ marginBottom: 20, width: 270 }}
        >
          🌍 Past Trips
        </Button>

        <Button
          mode="contained"
          buttonColor="black"
          textColor="white"
          onPress={() => setShowPasswordModal(true)}
          style={{ marginBottom: 20, width: 270 }}
        >
          🔐 Change Password
        </Button>
      </View>

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          marginTop: 25,
          padding: 12,
          width: 180,
          backgroundColor: 'black',
          borderRadius: 10,
          alignItems: 'center'
        }}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Logout</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showPasswordModal}
        onRequestClose={() => setShowPasswordModal(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, width: '85%', borderRadius: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>Change Password</Text>
            <TextInput
              placeholder="Enter current password"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
              style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 15, padding: 8 }}
            />
            <TextInput
              placeholder="Enter new password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
              style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 20, padding: 8 }}
            />
            <Button onPress={handleChangePassword} mode="contained" buttonColor="black">Submit</Button>
            <Button onPress={() => setShowPasswordModal(false)} style={{ marginTop: 10 }} textColor="black">Cancel</Button>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}