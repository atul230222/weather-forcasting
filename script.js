 const apiKey = "YOUR_OPENWEATHER_API_KEY";

const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");
const loading = document.getElementById("loading");

// Search Button
searchBtn.addEventListener("click", getWeather);

// Press Enter
cityInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

async function getWeather() {

    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    loading.classList.remove("hidden");
    weatherResult.innerHTML = "";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        loading.classList.add("hidden");

        changeBackground(data.weather[0].main);

        const icon = data.weather[0].icon;

        const date = new Date();

        weatherResult.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>

            <p>${date.toLocaleString()}</p>

            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">

            <h3>${Math.round(data.main.temp)}°C</h3>

            <p><strong>${data.weather[0].main}</strong></p>

            <p>${capitalize(data.weather[0].description)}</p>

            <hr>

            <p>🌡 Feels Like: ${data.main.feels_like}°C</p>

            <p>💧 Humidity: ${data.main.humidity}%</p>

            <p>🌬 Wind: ${data.wind.speed} m/s</p>

            <p>📊 Pressure: ${data.main.pressure} hPa</p>

            <p>⬇ Min Temp: ${data.main.temp_min}°C</p>

            <p>⬆ Max Temp: ${data.main.temp_max}°C</p>
        `;

        cityInput.value = "";

    } catch (error) {

        loading.classList.add("hidden");

        weatherResult.innerHTML = `
            <h3>❌ Error</h3>
            <p>${error.message}</p>
        `;
    }
}

function capitalize(text) {

    return text.charAt(0).toUpperCase() + text.slice(1);

}

function changeBackground(weather) {

    switch (weather) {

        case "Clear":
            document.body.style.background =
                "linear-gradient(135deg,#56CCF2,#2F80ED)";
            break;

        case "Clouds":
            document.body.style.background =
                "linear-gradient(135deg,#bdc3c7,#2c3e50)";
            break;

        case "Rain":
            document.body.style.background =
                "linear-gradient(135deg,#4B79A1,#283E51)";
            break;

        case "Thunderstorm":
            document.body.style.background =
                "linear-gradient(135deg,#232526,#414345)";
            break;

        case "Snow":
            document.body.style.background =
                "linear-gradient(135deg,#E6DADA,#274046)";
            break;

        case "Mist":
        case "Fog":
        case "Haze":
            document.body.style.background =
                "linear-gradient(135deg,#757F9A,#D7DDE8)";
            break;

        default:
            document.body.style.background =
                "linear-gradient(135deg,#4facfe,#00f2fe)";
    }

}