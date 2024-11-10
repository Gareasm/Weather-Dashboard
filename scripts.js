const apiKey = 'xxxxxxxxxxxxxxxxxxxxxxxx';  
const weatherDataDiv = document.getElementById('weatherData');

document.getElementById('cityForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('cityInput').value;
    fetchWeather(city);
});

function fetchWeather(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)

        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            weatherDataDiv.innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

function displayWeather(data) {
    const weatherHTML = `
        <h2>${data.name} (${data.sys.country})</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Weather: ${data.weather[0].description}</p>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
    `;
    weatherDataDiv.innerHTML = weatherHTML;
}
