import { View, Text, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import { CreateTripContext } from '../../context/CreateTripContext';
import { AI_PROMPT } from '../../constants/Options';
import { chatSession } from '../../configs/AiModal';
import { useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './../../configs/FirebaseConfig';

export default function GenerateTrip() {
    const { tripData, setTripData } = useContext(CreateTripContext);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const user = auth.currentUser;

    useEffect(() => {
        GenerateAiTrip();
    }, []);

    const GenerateAiTrip = async () => {
        try {
            setLoading(true);

            // 🛠 Update AI Prompt
            const FINAL_PROMPT = AI_PROMPT
                .replace('{location}', tripData?.locationInfo?.name)
                .replace('{totalDays}', tripData.totalNoOfDays)
                .replace('{totalNights}', tripData.totalNoOfDays - 1)
                .replace('{traveler}', tripData.traveler?.title)
                .replace('{budget}', tripData.budget);

            console.log("📢 Sending prompt to AI:", FINAL_PROMPT);

            // 🛠 Fetch AI Response
            const result = await chatSession.sendMessage(FINAL_PROMPT);
            const responseText = await result.response.text();

            console.log("📝 Full AI Response:", responseText);

            if (!responseText || responseText.trim() === "") {
                throw new Error("Empty response from AI.");
            }

            // 🛠 Extract JSON using regex
            const jsonMatch = responseText.match(/\{[\s\S]*\}/); // Finds first valid JSON
            if (!jsonMatch) throw new Error("No JSON found in AI response.");

            const cleanJson = jsonMatch[0];
            console.log("✅ Extracted JSON:", cleanJson);

            // 🛠 Parse JSON
            let tripResp;
            try {
                tripResp = JSON.parse(cleanJson);
            } catch (jsonError) {
                console.error("❌ JSON Parsing Error:", jsonError);
                throw new Error("Invalid JSON format received.");
            }

            setLoading(false);

            // ✅ Save to Firestore
            const docId = Date.now().toString();
            await setDoc(doc(db, "UserTrips", docId), {
                userEmail: user.email,
                tripPlan: tripResp, // AI Result
                tripData: JSON.stringify(tripData), // User Selection Data
                docId: docId
            });

            console.log("🔥 Trip saved with ID:", docId);
            router.push('(tabs)/mytrip');
        } catch (error) {
            console.error("❌ Error generating trip:", error.message);
            setLoading(false);
        }
    };

    return (
        <View style={{
            padding: 25,
            paddingTop: 75,
            backgroundColor: Colors.WHITE,
            height: '100%'
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 35,
                textAlign: 'center'
            }}>
                Please Wait...
            </Text>
            <Text style={{
                fontFamily: 'outfit-medium',
                fontSize: 20,
                textAlign: 'center',
                marginTop: 40
            }}>
                We are working to generate your dream trip
            </Text>

            <Image source={require('./../../assets/images/plane.gif')}
                style={{
                    width: '100%',
                    height: 200,
                    objectFit: 'contain'
                }}
            />

            <Text style={{
                fontFamily: 'outfit',
                color: Colors.GRAY,
                fontSize: 20,
                textAlign: 'center'
            }}>Do not Go Back</Text>
        </View>
    );
}
