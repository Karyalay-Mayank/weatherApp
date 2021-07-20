const key = 'API_KEY';

const formEl = document.querySelector('form');

const details = document.querySelector('.currentWeather');

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    details.innerHTML = '<i class="fa fa-spinner fa-spin"></i>';
    const location = e.target.location.value;
    weatherApp(location);
});

async function weatherApp(location) {
    const data = await fetchApi(location);
    generateHTML(data);
}

async function fetchApi(location) {
    const baseUrl = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric
&appid=${key}`;

    const res = await fetch(baseUrl);
    const data = await res.json();
    console.log(data);
    return data;
}

function generateHTML(data) {
    const visibility = data.visibility / 1000;
    const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${data.weather[0]["icon"]
        }.svg`;

    const html = `
        <div class="timeZone">
        <div class="temp">
            <img src="${icon}" alt="${data.weather[0].description}">
            <h2>${data.main.temp}<sup>°</sup>C</h2>
        </div>

        <div class="weatherInfo">
            <h4>${data.weather[0].description}</h4>
            <small>${data.name}, ${data.sys.country} (Lon:${data.coord.lon} Lat:${data.coord.lat})</small>
        </div>

        <div class="status">
            <p class="pressure">
                <i class="fas fa-cloud"></i>
                <span>Pressure: ${data.main.pressure}hPa</span>
            </p>
            <p class="humidity">
                <i class="fas fa-tint"></i>
                <span>Humidity: ${data.main.humidity}%</span>
            </p>
            <p class="visibility">
                <i class="far fa-eye"></i>
                <span>Visibility: ${visibility}Km</span>
            </p>
            <p class="windSpeed">
                <i class="fas fa-wind"></i>
                <span>Wind Speed: ${data.wind.speed}m/s</span>
            </p>
        </div>
        </div>
        `;

    details.innerHTML = html;
}
