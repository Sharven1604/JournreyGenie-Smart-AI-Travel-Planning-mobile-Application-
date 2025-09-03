
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { chatSession } from '../configs/Chat';

const sampleMessages = [
  'Best places to visit in Japan?',
  'Suggest a 3-day itinerary in Bali',
  'Where should I stay in Paris?',
  'Tips for solo travel',
  'What to pack for a trip to Iceland?'
];

const travelKeywords = [
  // General travel
  'travel', 'trip', 'journey', 'vacation', 'holiday', 'tour', 'explore', 'travel guide',
  'travel plan', 'travel ideas', 'trip ideas', 'travel tips', 'travel questions', 'travel checklist',

  // Destinations & places
  'destination', 'places to visit', 'where to go', 'tourist spots', 'must visit', 'hidden gems', 'sightseeing',

  // Transportation
  'flight', 'flights', 'plane', 'train', 'bus', 'car rental', 'commute', 'getting around', 'public transport',

  // Accommodation
  'hotel', 'hostel', 'homestay', 'airbnb', 'resort', 'stay', 'places to stay', 'booking', 'check-in', 'lodging',

  // Itinerary & schedule
  'itinerary', 'day plan', 'schedule', 'route', 'agenda', 'activities', 'plan my trip',

  // Documents & requirements
  'visa', 'passport', 'entry requirements', 'travel insurance', 'ID', 'documents',

  // Currency & cost
  'currency', 'money', 'costs', 'budget', 'cheap', 'expensive', 'how much', 'price', 'spending', 'affordable',

  // Measurement
  'distance', 'kilometers', 'miles', 'time zones',

  // Packing & luggage
  'luggage', 'pack', 'packing list', 'carry-on', 'what to bring', 'essentials',

  // Weather & timing
  'weather', 'climate', 'best time to visit', 'season', 'hot', 'cold', 'rainy season', 'sunny',

  // Communication
  'language', 'translation', 'local language', 'phrases', 'communicate',

  // Safety & health
  'safety', 'emergency', 'travel safety', 'vaccination', 'health', 'hospital', 'clinic',

  // Food & dining
  'food', 'eat', 'what to eat', 'local food', 'cuisine', 'dish', 'dishes',
  'street food', 'restaurants', 'cafes', 'places to eat', 'snacks',
  'dining', 'halal food', 'vegan food', 'vegetarian', 'must-try food',
  'specialty food', 'popular food', 'best food', 'desserts', 'breakfast', 'lunch', 'dinner', 'meals',

  // AI Assistant specific
  'genie', 'help me plan', 'travel assistant', 'guide me', 'suggest', 'recommend'
];


const isTravelRelated = (message) => {
  const lower = message.toLowerCase();
  return travelKeywords.some(keyword => lower.includes(keyword));
};

function formatResponseWithStars(text) {
  const lines = text.split('\n');
  return lines.map((line) => {
    let formattedLine = line;
    if (formattedLine.startsWith('**') && formattedLine.endsWith('**')) {
      const content = formattedLine.replace(/\*\*/g, '').replace(/\*/g, '');
      formattedLine = `🎀 ${content}`;
    } else {
      formattedLine = formattedLine.replace(/\*\*(.*?)\*\*/g, (_, boldText) => `👉${boldText}`);
      formattedLine = formattedLine.replace(/\*/g, '');
    }
    return formattedLine;
  }).join('\n');
}

export default function ChatBot() {
  const [messages, setMessages] = useState([
    {
      id: 'bot-1',
      text: "Hello! I'm Genie, your Travel Assistant 🤖. Ask me anything about destinations, hotels, deals, or travel tips!",
      sender: 'bot'
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = useCallback(async (msgText) => {
    const msg = msgText || input;
    if (!msg.trim()) return;

    const userMessage = { id: Date.now().toString(), text: msg, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    if (!isTravelRelated(msg)) {
      const warningMsg = {
        id: Date.now().toString() + '-warn',
        text: "❗ Genie can only help with travel-related questions. Try asking about destinations, hotels, or trip plans!",
        sender: 'bot'
      };
      setMessages(prev => [...prev, warningMsg]);
      setLoading(false);
      return;
    }

    try {
      const result = await chatSession.sendMessage(msg);
      let botResponse = result.response.text();
      botResponse = formatResponseWithStars(botResponse);
      const botMessage = {
        id: Date.now().toString() + '-bot',
        text: botResponse,
        sender: 'bot',
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now().toString() + '-error',
        text: 'Oops! Something went wrong. Please try again.',
        sender: 'bot',
      };
      setMessages(prev => [...prev, errorMessage]);
    }
    setLoading(false);
  }, [input]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={{ paddingVertical: 10 }}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[styles.message, msg.sender === 'user' ? styles.userMsg : styles.botMsg]}
          >
            <Text style={styles.text}>{msg.text}</Text>
          </View>
        ))}
        {loading && <ActivityIndicator size="small" color="#000" style={{ marginTop: 10 }} />}
      </ScrollView>

      <ScrollView
        horizontal
        style={styles.samplesContainer}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        showsHorizontalScrollIndicator={false}
      >
        {sampleMessages.map((prompt, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => sendMessage(prompt)}
            style={styles.samplePrompt}
          >
            <Text style={{ color: '#fff' }}>{prompt}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask Genie your travel question..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={() => sendMessage()}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  message: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '85%',
  },
  userMsg: {
    backgroundColor: '#000000',
    alignSelf: 'flex-end',
  },
  botMsg: {
    backgroundColor: '#6e6e6e',
    alignSelf: 'flex-start',
  },
  text: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Outfit-Regular'
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 0,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#000000',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  samplesContainer: {
    maxHeight: 50,
    paddingVertical: 5,
  },
  samplePrompt: {
    backgroundColor: '#000',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
  },
});