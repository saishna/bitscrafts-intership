// Assuming you have an HTML input element with id="cityInput" and a submit button with id="submitButton"
const cityInput = document.getElementById('cityInput');
const submitButton = document.getElementById('submitButton');

async function getWeather(city) {
  const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '1e9af21323msh5214ba831549cc0p19f187jsn495eae1b2af9',
      'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const responseData = await response.json();

    // Assuming you have HTML elements with appropriate IDs
    document.getElementById('temp').innerHTML = responseData.temp;
    document.getElementById('min_temp').innerHTML = responseData.min_temp;
    document.getElementById('max_temp').innerHTML = responseData.max_temp;
    document.getElementById('wind_speed').innerHTML = responseData.wind_speed;
    document.getElementById('wind_degrees').innerHTML = responseData.wind_degrees;
    document.getElementById('sunset').innerHTML = responseData.sunset;
    document.getElementById('sunrise').innerHTML = responseData.sunrise;
    document.getElementById('humidity').innerHTML = responseData.humidity;

    // Generate 7-day forecast based on current weather data
    generateForecast(responseData);
  } catch (error) {
    console.error(error);
  }
}

function generateForecast(currentWeather) {
  const forecastSection = document.getElementById('forecastSection');
  forecastSection.innerHTML = ''; // Clear previous forecast data

  // Assuming a simple method to generate forecast data
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const minTemp = currentWeather.min_temp;
  const maxTemp = currentWeather.max_temp;
  const humidity = currentWeather.humidity;
  const windSpeed = currentWeather.wind_speed;

  // Font Awesome icon class for weather icon
  const weatherIconClass = 'fas fa-sun'; // Change this to the appropriate icon class

  // Generate forecast cards for each day
  for (let i = 0; i < 7; i++) {
    const forecastCard = document.createElement('div');
    forecastCard.classList.add('col-md-3', 'mb-4');

    const date = new Date();
    date.setDate(date.getDate() + i);
    const dayName = days[date.getDay()];

    forecastCard.innerHTML = `
      <div class="card rounded-3 shadow-sm">
          <div class="card-body">
              <h5 class="card-title">${dayName}</h5>
              <i class="${weatherIconClass} weather-icon"></i>
              <ul class="list-unstyled mt-3 mb-4">
                  <li>Min Temp: ${minTemp} °C</li>
                  <li>Max Temp: ${maxTemp} °C</li>
                  <li>Humidity: ${humidity}%</li>
                  <li>Wind Speed: ${windSpeed} m/s</li>
              </ul>
          </div>
      </div>
  `;

    forecastSection.appendChild(forecastCard);
  }
}

// Add event listener to submitButton
submitButton.addEventListener('click', async () => {
  const city = cityInput.value;
  await getWeather(city);
});

// Call the function initially with default city (Kathmandu)
getWeather('Kathmandu');
