const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("show");
});

const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = `Last Modification: ${document.lastModified}`;
}

const API_KEY = "05252775088c2a8ff25aa9917c92819d";

const latitude = 6.3703;
const longitude = 2.3912;

async function getCurrentWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to retrieve current weather.");
        }

        const data = await response.json();
        const temperature = document.querySelector("#current-temperature");
        const description = document.querySelector("#weather-description");

        if (temperature) {
            temperature.textContent = `${Math.round(data.main.temp)}°C`;
        }

        if (description) {
            description.textContent = capitalizeFirstLetter(data.weather[0].description);
        }

    } catch (error) {
        console.error("Weather error:", error);

        const weatherContainer =
            document.querySelector("#current-weather");

        if (weatherContainer) {
            weatherContainer.innerHTML = "<p>Weather information is currently unavailable.</p>";
        }
    }
}

async function getForecast() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to retrieve forecast.");
        }

        const data = await response.json();

        const forecastContainer = document.querySelector("#forecast-container");

        if (!forecastContainer) {
            return;
        }

        forecastContainer.innerHTML = "";

        const dailyForecasts = [];

        for (const forecast of data.list) {
            const date = new Date(forecast.dt * 1000);

            const dateString =
                date.toISOString().split("T")[0];

            if (!dailyForecasts.some(
                item => item.date === dateString
            )) {
                dailyForecasts.push({
                    date: dateString,
                    forecast: forecast
                });
            }

            if (dailyForecasts.length === 3) {
                break;
            }
        }

        dailyForecasts.forEach(day => {

            const date = new Date(day.forecast.dt * 1000);

            const article = document.createElement("article");

            article.classList.add("forecast-card");

            article.innerHTML = `
                <h4>
                    ${date.toLocaleDateString("en-US", {
                        weekday: "long"
                    })}
                </h4>

                <p>
                    <strong>
                        ${Math.round(day.forecast.main.temp)}°C
                    </strong>
                </p>

                <p>
                    ${capitalizeFirstLetter(
                        day.forecast.weather[0].description
                    )}
                </p>
            `;

            forecastContainer.appendChild(article);
        });

    } catch (error) {
        console.error("Forecast error:", error);

        const forecastContainer = document.querySelector("#forecast-container");

        if (forecastContainer) {
            forecastContainer.innerHTML = "<p>Forecast information is currently unavailable.</p>";
        }
    }
}

async function loadSpotlights() {

    const spotlightContainer = document.querySelector("#spotlights");

    if (!spotlightContainer) {
        return;
    }

    try {

        const response =await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load members.json.");
        }

        const members = await response.json();

        const qualifiedMembers =
            members.filter(member => member.membership === 3 || member.membership === 2
        );

        const shuffledMembers = qualifiedMembers.sort(() => Math.random() - 0.5);
        const selectedMembers = shuffledMembers.slice(0, 3);

        spotlightContainer.innerHTML = "";

        selectedMembers.forEach(member => {

            const article = document.createElement("article");
            article.classList.add("spotlight-card");

            const membershipName =
                member.membership === 3
                    ? "Gold Member"
                    : "Silver Member";

            article.innerHTML = `
                <img
                    src="${member.image}"
                    alt="${member.name} logo"
                    loading="lazy"
                >

                <div class="spotlight-content">

                    <h3>${member.name}</h3>

                    <p class="membership">
                        ${membershipName}
                    </p>

                    <p>
                        ${member.description}
                    </p>

                    <p>
                        <strong>Address:</strong>
                        ${member.address}
                    </p>

                    <p>
                        <strong>Phone:</strong>
                        ${member.phone}
                    </p>

                    <p>
                        <strong>Website:</strong>
                        <a
                            href="${member.website}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Visit Website
                        </a>
                    </p>
                </div>
            `;

            spotlightContainer.appendChild(article);
        });

    } catch (error) {
        console.error("Spotlight error:", error);
        spotlightContainer.innerHTML = "<p>Company information is currently unavailable.</p>";
    }
}

function capitalizeFirstLetter(text) {

    if (!text) {
        return "";
    }

    return text.charAt(0).toUpperCase() + text.slice(1);
}

getCurrentWeather();
getForecast();
loadSpotlights();