import { APIKEY } from './environment.js';

/* Search Variable */
let searchLocation = document.getElementById('searchLocation');

/* HTML to Change Variables */
let weatherLocation = document.getElementById('weatherLocation');
let weatherDate = document.getElementById('weatherDate');

/* Test Variable */
let testApi = document.getElementById('testApi');


async function getWeather(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${APIKEY}`);
        if(!response.ok) {
            throw new Error("Weather Location Error");
        }
        const data = await response.json();
        return data;

    } catch(error) {
        console.error("Error in getWeather:", error.message);
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
        console.error("Error in getWeeklyForecast:", error.message);
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
        console.error("Error in getWeatherLocation:", error.message);
    }
}


searchLocation.addEventListener('keypress', async (e) => {
    if(e.key === 'Enter') {
        let userInput = searchLocation.value.trim();

        if(!userInput) {
            console.error("Please enter a valid city name.");
            return;
        }

        console.log("User Input:", userInput);

        const locationData = await getWeatherLocation(userInput);
        if(!locationData) {
            console.error("Invalid city name.");
            return;
        }

        const { lat, lon, name: city, country } = locationData;

        const weatherData = await getWeather(lat, lon);
        const weeklyData = await getWeeklyForecast(lat, lon);

        if(weatherData && weeklyData) {
            weatherLocation.textContent = `${city}, ${country}`;

            const date = weatherData.current.dt;
            const currentDate = new Date(date * 1000);
            const currentDateFormat = currentDate.toLocaleDateString();

            weatherDate.textContent = currentDateFormat;

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
