const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    const api_key = "d6fc47238370fc85b4a3ffbbb4858f7f";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    try {
        const response = await fetch(url);
        const weather_data = await response.json();

        if (weather_data.cod === "404") {
           
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            console.log("City not found");
            return;
        }

        console.log("Weather data:", weather_data);
        location_not_found.style.display = "none";
        weather_body.style.display = "flex";
        temperature.innerHTML = `
        ${Math.round(weather_data.main.temp - 273.15)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

        // Set weather image based on weather condition
        switch (weather_data.weather[0].main) {
            case 'clouds':
                weather_img.src = "/assets/cloud.png";
                break;
            case 'clear':
                weather_img.src = "/assets/clear.png";
                break;
            case 'rain':
                weather_img.src = "/assets/rain.png";
                break;
            case 'mist':
                weather_img.src = "/assets/mist.png";
                break;
            case 'snow':
                weather_img.src = "/assets/snow.png";
                break;
            default:
                // Handle other weather conditions if needed
                break;
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        // Handle errors such as network issues
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});
