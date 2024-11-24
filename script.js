const apiKey = 'eef218a1131c6c00800e95ad4e02e91d'; 
const getWeatherButton = document.getElementById('getWeather');
const cityInput = document.getElementById('city');
const weatherResult = document.getElementById('weatherResult');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const weatherCondition = document.getElementById('weatherCondition');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const airQuality = document.getElementById('airQuality');

getWeatherButton.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (!city) {
    alert('Please enter a city name');
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.cod !== 200) {
        alert(data.message);
        return;
      }

      const { lat, lon } = data.coord;

      cityName.textContent = `Weather in ${data.name}`;
      temperature.textContent = `Temperature: ${data.main.temp}°C`;
      weatherCondition.textContent = `Condition: ${data.weather[0].description}`;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
      windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

      fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then(response => response.json())
        .then(airData => {
          const aqi = airData.list[0].main.aqi;
          const aqiLevels = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
          airQuality.textContent = `Air Quality: ${aqiLevels[aqi - 1]} (AQI: ${aqi})`;
          weatherResult.classList.remove('hidden');
        })
        .catch(error => {
          console.error('Error fetching air quality data:', error);
          airQuality.textContent = 'Air Quality: Unable to fetch data';
        });
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      alert('Failed to fetch weather data. Please try again.');
    });
});
