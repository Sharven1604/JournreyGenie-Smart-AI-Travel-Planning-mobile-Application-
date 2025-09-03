export const SelectTravelesList=[
    {
        id:1,
        title:'Just Me',
        desc:'A sole traveles in exploration',
        icon:'✈️',
        people:'1'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two traveles in tandem',
        icon:'🥂',
        people:'2 People'
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving adv',
        icon:'🏡',
        people:'3 to 5 People'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seekes',
        icon:'⛵',
        people:'5 to 10 People'
    },
]


export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'💵',
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💰',
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about cost',
        icon:'💸',
    },
]
export const AI_PROMPT = `
Generate a detailed travel plan in JSON format for the following inputs:

- Location: {location}
- Duration: {totalDays} Days and {totalNights} Nights
- Traveler: {traveler}
- Budget: {budget}

### Required Sections in Output:

1. **Flight Details**:
   - flightName
   - price
   - bookingUrl

2. **Hotels List**:
   - hotelName
   - address
   - price (per night) according to the countries currency
   - imageUrl
   - geoCoordinates
   - rating
   - description

3. **Suggested Itineraries** (MUST INCLUDE EXACTLY 3 PLANS):
   - Each plan must cover **{totalDays} days**
   - Each day must contain **3 unique places**
   - All places across all plans must be **distinct**
   - Each place must include:
     - placeName
     - placeDetails
     - placeImageUrl
     - geoCoordinates (latitude, longitude)
     - ticketPricing
     - timeToTravel
     - bestTimeToVisit

🚨 Ensure that you return **exactly 3 full itinerary plans** in the "itineraries" array. Each plan should cover all {totalDays} with 3 places per day. Do not summarize. Do not omit. Do not repeat plans. Each plan must have different sets of places.

### Final Output Format (in JSON):
{
  "Location": "{location}",
  "Duration": "{totalDays} Days and {totalNights} Nights",
  "Traveler": "{traveler}",
  "Budget": "{budget}",

  "flightDetails": {
    "flightName": "Sample Airlines",
    "price": "USD 450",
    "bookingUrl": "https://sampleflight.com"
  },

  "hotels": [
    {
      "hotelName": "The Urban Stay",
      "address": "123 Sample Street, {location}",
      "price": "USD 120 per night",
      "imageUrl": "https://example.com/hotel.jpg",
      "geoCoordinates": "3.1390° N, 101.6869° E",
      "rating": "4.5",
      "description": "Modern hotel with amenities and prime location."
    }
  ],

  "itineraries": [
    {
      "plan": 1,
      "days": [
        {
          "day": 1,
          "places": [
            {
              "placeName": "Example Place 1",
              "placeDetails": "Description of the place.",
              "placeImageUrl": "https://example.com/place1.jpg",
              "geoCoordinates": { "latitude": 3.1412, "longitude": 101.6937 },
              "ticketPricing": "USD 10",
              "timeToTravel": "30 mins",
              "bestTimeToVisit": "Morning"
            },
            ...
          ]
        },
        ...
      ]
    },
    {
      "plan": 2,
      "days": [
        ...
      ]
    },
    {
      "plan": 3,
      "days": [
        ...
      ]
    }
  ]
}

`;




