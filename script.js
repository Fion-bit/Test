
const travelData = {
    paris: {
        spots: "Eiffel Tower, Louvre Museum, Notre-Dame Cathedral",
        activities: "Enjoy a Seine River cruise, explore Montmartre, visit Versailles",
        tips: "Use public transport, buy a Paris Pass for attractions, try French pastries",
        image: "paris.jpg"
    },
    tokyo: {
        spots: "Tokyo Tower, Shibuya Crossing, Meiji Shrine",
        activities: "Visit Akihabara, try sushi at Tsukiji Market, enjoy cherry blossoms in spring",
        tips: "Learn basic Japanese phrases, use a prepaid Suica card for travel, avoid rush hours",
        image: "tokyo.jpg"
    },
    newyork: {
        spots: "Statue of Liberty, Central Park, Times Square",
        activities: "Walk the High Line, visit museums, explore Broadway shows",
        tips: "Buy a MetroCard, wear comfortable shoes, explore neighborhoods like Brooklyn",
        image: "newyork.jpg"
    },
    london: {
        spots: "Big Ben, Tower of London, Buckingham Palace",
        activities: "Ride the London Eye, explore the British Museum, visit Camden Market",
        tips: "Use an Oyster card for travel, pack an umbrella, explore neighborhoods like Shoreditch",
        image: "london.jpg"
    },
    sydney: {
        spots: "Sydney Opera House, Sydney Harbour Bridge, Bondi Beach",
        activities: "Take a harbor cruise, visit Taronga Zoo, explore the Blue Mountains",
        tips: "Use sunscreen, stay hydrated, use Opal card for public transport",
        image: "sydney.jpg"
    },
    dubai: {
        spots: "Burj Khalifa, Palm Jumeirah, Dubai Mall",
        activities: "Enjoy a desert safari, visit Dubai Aquarium, explore Global Village",
        tips: "Dress modestly, avoid summer travel, explore local souks",
        image: "dubai.jpg"
    },
    rio: {
        spots: "Christ the Redeemer, Sugarloaf Mountain, Copacabana Beach",
        activities: "Join a samba class, attend a football match, explore Tijuca National Park",
        tips: "Be cautious of your belongings, learn basic Portuguese phrases, try local dishes like feijoada",
        image: "rio.jpg"
    },
    mumbai: {
        spots: "Gateway of India, Marine Drive, Elephanta Caves",
        activities: "Explore Bollywood tours, visit Crawford Market, enjoy street food at Juhu",
        tips: "Use local trains during off-peak hours, carry cash, try vada pav and pav bhaji",
        image: "mumbai.jpg"
    },
    bangkok: {
        spots: "Grand Palace, Wat Arun, Chatuchak Market",
        activities: "Enjoy a river cruise, try street food, shop at floating markets",
        tips: "Use Grab for transport, avoid scams, stay hydrated",
        image: "bangkok.jpg"
    },
    prishtina: {
        spots: "Mother Teresa Square, Germia Park, Newborn Monument",
        activities: "Visit the Ethnological Museum, explore Prishtina Bear Sanctuary, enjoy local cafes",
        tips: "Learn basic Albanian phrases, explore local restaurants, visit historical mosques",
        image: "prishtina.jpg"  
    },
    rome: {
        spots: "Colosseum, Vatican City, Trevi Fountain",
        activities: "Enjoy gelato, visit ancient ruins, take a Vespa tour",
        tips: "Buy tickets in advance, wear comfortable shoes, explore side streets",
        image: "rome.jpg"
    },
    sanFrancisco: {
        spots: "Golden Gate Bridge, Alcatraz Island, Fisherman's Wharf",
        activities: "Ride a cable car, visit Golden Gate Park, explore Chinatown",
        tips: "Pack layers, use public transport, try clam chowder in a bread bowl",
        image: "sanfrancisco.jpg"
    },
    singapore: {
        spots: "Marina Bay Sands, Gardens by the Bay, Sentosa Island",
        activities: "Try hawker food, visit the Singapore Zoo, shop on Orchard Road",
        tips: "Carry an umbrella, use the MRT for travel, stay hydrated in the heat",
        image: "singapore.jpg"
    },
    istanbul: {
        spots: "Hagia Sophia, Blue Mosque, Grand Bazaar",
        activities: "Cruise the Bosphorus, try Turkish tea and baklava, visit Topkapi Palace",
        tips: "Carry cash for local markets, dress modestly for mosques, learn basic Turkish phrases",
        image: "istanbul.jpg"
    },
    kyoto: {
        spots: "Kinkaku-ji, Fushimi Inari Shrine, Arashiyama Bamboo Grove",
        activities: "Participate in a tea ceremony, visit traditional geisha districts, explore Nishiki Market",
        tips: "Use buses for travel, wear slip-on shoes for temples, respect local customs",
        image: "kyoto.jpg"
    }
};



const apiKey = "d2d05376265899d0d11ac98c753830e6"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";


async function getTravelInfo() {
    const destinationInput = document.getElementById("destination").value.toLowerCase().trim();
    const recommendationsDiv = document.getElementById("recommendations");

    if (!destinationInput) {
        recommendationsDiv.innerHTML = "<p>Please enter a destination!</p>";
        return;
    }

   
    const weatherData = await getWeatherData(destinationInput);
    
   
    if (travelData[destinationInput]) {
        const data = travelData[destinationInput];
        recommendationsDiv.innerHTML = `
            <h3>Recommendations for ${destinationInput.charAt(0).toUpperCase() + destinationInput.slice(1)}</h3>
            <img src="${data.image}" alt="${destinationInput}" style="width: 300px; height: auto; margin-bottom: 20px;">
            <p><strong>Top Spots:</strong> ${data.spots}</p>
            <p><strong>Activities:</strong> ${data.activities}</p>
            <p><strong>Travel Tips:</strong> ${data.tips}</p>
            <h4>Weather</h4>
            <p><strong>Temperature:</strong> ${weatherData.temp}°C</p>
            <p><strong>Weather:</strong> ${weatherData.description}</p>
        `;
    } else {
        recommendationsDiv.innerHTML = `
            <p>Sorry, we don't have information for "${destinationInput}". Try another destination!</p>
        `;
    }
}

async function getWeatherData(city) {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}&units=imperial`); // Changed units to imperial
    const data = await response.json();
    
    if (data.cod !== 200) {
        return { temp: "N/A", description: "No data available" };
    }

    const temp = data.main.temp;
    const description = data.weather[0].description;

    return {
        temp,
        description
    };
}
document.getElementById("destination").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getTravelInfo();
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const payButton = document.getElementById("payButton");
    const searchButton = document.getElementById("searchButton");
    const destinationInput = document.getElementById("destination");
  
    let isPaid = false;
  
    // Function to simulate payment (In a real application, this would be handled by a payment gateway)
    payButton.addEventListener("click", () => {
      // Simulate successful payment
      isPaid = true;
      alert("Payment successful! You can now proceed with booking.");
      enableDestinationInput();
    });
  
    // Enable destination input field after payment
    function enableDestinationInput() {
      destinationInput.disabled = false;
      searchButton.disabled = false;
    }
  
    // Prevent form submission if the user hasn't paid
    searchButton.addEventListener("click", (event) => {
      if (!isPaid) {
        alert("Please make the payment to proceed.");
        event.preventDefault();
      } else {
        // Proceed with the trip booking (just a placeholder action)
        alert("Searching destinations...");
      }
    });
  });
  // Disable destination input and search button initially
const payButton = document.getElementById("payButton");
const destinationInput = document.getElementById("destination");
const searchButton = document.getElementById("searchButton");

// Payment link generated from Stripe (replace with your actual payment link)
const paymentLink = "https://buy.stripe.com/test_eVa3cJcbZ2Qa1e8fYY";  // Replace with your Stripe Payment Link

// Function to redirect to the Stripe payment link when user clicks the button
document.getElementById("payButton").addEventListener('click', function() {
  window.location.href = paymentLink; // Redirect to the Stripe Checkout page
});







