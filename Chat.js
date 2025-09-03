// configs/chat.js (Final - Plain Text Only with Point Form)

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-thinking-exp-01-21",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 12000,
    responseMimeType: "text/plain" // ✅ Ensures plain text output
  };
  
  export const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text:
              "You are a helpful travel assistant AI. Only answer questions related to travel such as destination suggestions, trip itineraries, places to visit, travel advice, what to pack, best time to travel, hotel recommendations, and flight details. Do not answer questions unrelated to travel. Keep your response easy to read and in plain text. Format your answer clearly using bullet points or numbered lists. Do not include JSON in your answer."
          }
        ]
      },
      {
        role: "model",
        parts: [
          {
            text:
              "Got it! I'm your travel assistant. Ready to help with anything related to trips, destinations, hotels, and more!"
          }
        ]
      }
    ]
  });
