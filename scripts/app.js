import { APIKEY } from './environment.js';

/* Search Variable */
let searchLocation = document.getElementById('searchLocation');

/* HTML to Change Variables */
let weatherLocation = document.getElementById('weatherLocation');
let weatherDate = document.getElementById('weatherDate');
let currentTemp = document.getElementById('currentTemp');
let currentTempMin = document.getElementById('currentTempMin');
let currentTempMax = document.getElementById('currentTempMax');
let favBtn = document.getElementById('favBtn');
let favoritesContainer = document.querySelector('.fav-container');

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

/* Test Variable */
// let testApi = document.getElementById('testApi');

async function getWeather(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${APIKEY}`);
        if(!response.ok) {
            throw new Error("Weather Location Error");
        }
        const data = await response.json();
        return data;

    } catch(error) {
        console.error("Error in getWeather: ", error.message);
    }
}

async function getWeeklyForecast(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}`);
        if(!response.ok) {
            throw new Error("Forecast Error");
        }
        const data = await response.json();
        return data;

    } catch(error) {
        console.error("Error in getWeeklyForecast: ", error.message);
    }
}

async function getWeatherLocation(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKEY}`);
        if (!response.ok) {
            throw new Error("Location Error");
        }
        const data = await response.json();
        
        if (data.length === 0) {
            throw new Error("No location data found");
        }
        console.log("Location Data:", data);
        return data[0];

    } catch(error) {
        console.error("Error in getWeatherLocation: ", error.message);
    }
}


function updateCurrentWeather(weatherData, city, country) {
    const date = new Date(weatherData.current.dt * 1000).toLocaleDateString();
    weatherLocation.textContent = `${city}, ${country}`;
    weatherDate.textContent = date;
    currentTemp.textContent = `${Math.round(weatherData.current.temp - 273.15)}°C`;
    currentTempMin.textContent = `${Math.round(weatherData.daily[0].temp.min - 273.15)}°C`;
    currentTempMax.textContent = `${Math.round(weatherData.daily[0].temp.max - 273.15)}°C`;

    document.getElementById("currentWeatherIcon").classList.remove("hidden");
}


function updateForecast(daily) {

    const data1 = daily[1];
    const date1 = new Date(data1.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
    const minTemp1 = Math.round(data1.temp.min - 273.15);
    const maxTemp1 = Math.round(data1.temp.max - 273.15);
    const minMax1 = minTemp1 + "°C / " + maxTemp1 + "°C";
    document.getElementById("weekDay1").textContent = date1;
    document.getElementById("weekDay1MinMax").textContent = minMax1;
    document.getElementById("weekDay1Icon").classList.remove("hidden");


    const data2 = daily[2];
    const date2 = new Date(data2.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
    const minTemp2 = Math.round(data2.temp.min - 273.15);
    const maxTemp2 = Math.round(data2.temp.max - 273.15);
    const minMax2 = minTemp2 + "°C / " + maxTemp2 + "°C";
    document.getElementById("weekDay2").textContent = date2;
    document.getElementById("weekDay2MinMax").textContent = minMax2;
    document.getElementById("weekDay2Icon").classList.remove("hidden");

    const data3 = daily[3];
    const date3 = new Date(data3.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
    const minTemp3 = Math.round(data3.temp.min - 273.15);
    const maxTemp3 = Math.round(data3.temp.max - 273.15);
    const minMax3 = minTemp3 + "°C / " + maxTemp3 + "°C";
    document.getElementById("weekDay3").textContent = date3;
    document.getElementById("weekDay3MinMax").textContent = minMax3;
    document.getElementById("weekDay3Icon").classList.remove("hidden");


    const data4 = daily[4];
    const date4 = new Date(data4.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
    const minTemp4 = Math.round(data4.temp.min - 273.15);
    const maxTemp4 = Math.round(data4.temp.max - 273.15);
    const minMax4 = minTemp4 + "°C / " + maxTemp4 + "°C";
    document.getElementById("weekDay4").textContent = date4;
    document.getElementById("weekDay4MinMax").textContent = minMax4;
    document.getElementById("weekDay4Icon").classList.remove("hidden");

    const data5 = daily[5];
    const date5 = new Date(data5.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
    const minTemp5 = Math.round(data5.temp.min - 273.15);
    const maxTemp5 = Math.round(data5.temp.max - 273.15);
    const minMax5 = minTemp5 + "°C / " + maxTemp5 + "°C";
    document.getElementById("weekDay5").textContent = date5;
    document.getElementById("weekDay5MinMax").textContent = minMax5;
    document.getElementById("weekDay5Icon").classList.remove("hidden");
}


function updateFavoritesUI() {

    const buttons = favoritesContainer.querySelectorAll('.fav-city-btn');
    buttons.forEach(function(button) {
        button.remove();
    });

    let city1 = favorites[0];
    if (city1 && typeof city1 === 'string' && city1.trim()) {
        const cityBtn1 = document.createElement('button');
        cityBtn1.textContent = city1;
        cityBtn1.classList.add('fav-city-btn');
        cityBtn1.onclick = function() { handleCityClick(city1); };
        favoritesContainer.appendChild(cityBtn1);
    }

    let city2 = favorites[1];
    if (city2 && typeof city2 === 'string' && city2.trim()) {
        const cityBtn2 = document.createElement('button');
        cityBtn2.textContent = city2;
        cityBtn2.classList.add('fav-city-btn');
        cityBtn2.onclick = function() { handleCityClick(city2); };
        favoritesContainer.appendChild(cityBtn2);
    }

    let city3 = favorites[2];
    if (city3 && typeof city3 === 'string' && city3.trim()) {
        const cityBtn3 = document.createElement('button');
        cityBtn3.textContent = city3;
        cityBtn3.classList.add('fav-city-btn');
        cityBtn3.onclick = function() { handleCityClick(city3); };
        favoritesContainer.appendChild(cityBtn3);
    }

    let city4 = favorites[3];
    if (city4 && typeof city4 === 'string' && city4.trim()) {
        const cityBtn4 = document.createElement('button');
        cityBtn4.textContent = city4;
        cityBtn4.classList.add('fav-city-btn');
        cityBtn4.onclick = function() { handleCityClick(city4); };
        favoritesContainer.appendChild(cityBtn4);
    }

    let city5 = favorites[4];
    if (city5 && typeof city5 === 'string' && city5.trim()) {
        const cityBtn5 = document.createElement('button');
        cityBtn5.textContent = city5;
        cityBtn5.classList.add('fav-city-btn');
        cityBtn5.onclick = function() { handleCityClick(city5); };
        favoritesContainer.appendChild(cityBtn5);
    }
}

function handleCityClick(city) {
    getWeatherLocation(city).then(function(locationData) {
        if (!locationData) {
            console.error("Invalid city name.");
            return;
        }

        const { lat, lon, name, country } = locationData;
        getWeather(lat, lon).then(function(weatherData) {
            getWeeklyForecast(lat, lon).then(function(weeklyData) {
                if (weatherData && weeklyData) {
                    updateCurrentWeather(weatherData, name, country);
                    updateForecast(weatherData.daily);
                } else {
                    console.error("Weather data not available.");
                }
            });
        });
    });
}



searchLocation.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        let userInput = searchLocation.value.trim();

        if (!userInput) {
            console.error("Please enter a valid city name.");
            return;
        }

        console.log("User Input:", userInput);

        const locationData = await getWeatherLocation(userInput);
        if (!locationData) {
            console.error("Invalid city name.");
            return;
        }

        const { lat, lon, name: city, country } = locationData;

        const weatherData = await getWeather(lat, lon);
        const weeklyData = await getWeeklyForecast(lat, lon);

        if (weatherData && weeklyData) {
            updateCurrentWeather(weatherData, city, country);
            updateForecast(weatherData.daily);

            console.log("Weather Data:", weatherData);
            console.log("Weekly Forecast:", weeklyData);
        } else {
            console.error("Weather data not available.");
        }
    }
});



/* Testing API Below */


// testApi.addEventListener('click', async () => {
//     const data = await getWeather();
//     const dataWeekly = await getWeeklyForecast();

//     console.log(data);
//     console.log(dataWeekly);

//     const temperature = data.current.temp;
//     const tempCels = Math.floor(temperature - 273.15);

//     const tempMin = data.daily[0].temp.min;
//     const minConverted = Math.floor(tempMin - 273.15);
//     const tempMax = data.daily[0].temp.max;
//     const maxConverted = Math.floor(temperature - 273.15);

//     const date = data.current.dt;
//     const currentDate = new Date(date * 1000);
//     const currentDateFormat = currentDate.toLocaleDateString();

//     /* --- */
//     const city = dataWeekly.city.name;
//     const country = dataWeekly.city.country;

//     const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//     const day1 = dataWeekly.list[8].dt;
//     const day1Convert = new Date(day1 * 1000);
//     const dayIndex = day1Convert.getDay();
//     const week1Day = dayOfWeek[dayIndex];

//     const day2 = dataWeekly.list[16].dt;
//     const day2Convert = new Date(day2 * 1000);
//     const day2Index = day2Convert.getDay();
//     const week2Day = dayOfWeek[day2Index];

//     const day3 = dataWeekly.list[24].dt;
//     const day3Convert = new Date(day3 * 1000);
//     const day3Index = day3Convert.getDay();
//     const week3Day = dayOfWeek[day3Index];

//     const day4 = dataWeekly.list[32].dt;
//     const day4Convert = new Date(day4 * 1000);
//     const day4Index = day4Convert.getDay();
//     const week4Day = dayOfWeek[day4Index];

//     const day5 = dataWeekly.list[39].dt;
//     const day5Convert = new Date(day5 * 1000);
//     const day5Index = day5Convert.getDay();
//     const week5Day = dayOfWeek[day5Index];
    

//     console.log(dayOfWeek[dayIndex]);
//     console.log(dayOfWeek[day2Index]);
//     console.log(dayOfWeek[day3Index]);
//     console.log(dayOfWeek[day4Index]);
//     console.log(dayOfWeek[day5Index]);
    

//     const day1Min = Math.floor((dataWeekly.list[13].main.temp_min) - 273.15);
//     const day1Max = Math.floor((dataWeekly.list[8].main.temp_max) - 273.15);
//     const day2Min = Math.floor((dataWeekly.list[16].main.temp_min) - 273.15);
//     const day2Max = Math.floor((dataWeekly.list[20].main.temp_max) - 273.15);
//     const day3Min = Math.floor((dataWeekly.list[29].main.temp_min) - 273.15);
//     const day3Max = Math.floor((dataWeekly.list[24].main.temp_max) - 273.15);
//     const day4Min = Math.floor((dataWeekly.list[36].main.temp_min) - 273.15);
//     const day4Max = Math.floor((dataWeekly.list[32].main.temp_max) - 273.15);
//     const day5Min = Math.floor((dataWeekly.list[39].main.temp_min) - 273.15);
//     const day5Max = Math.floor((dataWeekly.list[39].main.temp_max) - 273.15);

//     console.log(`${dayOfWeek[dayIndex]}: Min: ${day1Min} / Max: ${day1Max}`);
//     console.log(`${dayOfWeek[day2Index]}: Min: ${day2Min} / Max: ${day2Max}`);
//     console.log(`${dayOfWeek[day3Index]}: Min: ${day3Min} / Max: ${day3Max}`);
//     console.log(`${dayOfWeek[day4Index]}: Min: ${day4Min} / Max: ${day4Max}`);
//     console.log(`${dayOfWeek[day5Index]}: Min: ${day5Min} / Max: ${day5Max}`);

//     console.log(`Location: ${city}, ${country} `);
//     /* --- */

//     console.log(`Temperature: ${tempCels}\u00B0c` );
//     console.log(`Min Temp: ${minConverted}\u00B0c`);
//     console.log(`Max Temp: ${maxConverted}\u00B0c`);
//     console.log(`Date: ${currentDateFormat}`);

// });
