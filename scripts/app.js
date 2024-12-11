import { APIKEY } from './environment.js';



async function getWeather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid=${APIKEY}`);
        if(!response.ok){
            throw new Error("error");
        }
        const data = await response.json();

        console.log(data);

        const temperature = data.current.temp;
        const tempCels = Math.floor(temperature - 273.15);

        const tempMin = data.daily[0].temp.min;
        const minConverted = Math.floor(tempMin - 273.15);
        const tempMax = data.daily[0].temp.max;
        const maxConverted = Math.floor(temperature - 273.15);

        const date = data.current.dt;
        const currentDate = new Date(date * 1000);
        const currentDateFormat = currentDate.toLocaleDateString();

        console.log(`Temperature: ${tempCels}\u00B0c` );
        console.log(`Min Temp: ${minConverted}\u00B0c`);
        console.log(`Max Temp: ${maxConverted}\u00B0c`);
        console.log(`Date: ${currentDateFormat}`);

    } catch(error){
        console.error(error.message);
    }
}

getWeather();

// adding geo api and 5 day forecast api 
// the fetch below is a test for the two apis coming up

async function getWeeklyForecast(){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=33.44&lon=-94.04&appid=${APIKEY}`)
        if(!response.ok){
            throw new Error("Forecast Error");
        }
        const data = await response.json();
        console.log(data);
    
        const city = data.city.name;
        const country = data.city.country;

        console.log(`Location: ${city}, ${country} `);

    } catch(error){
        console.error(error.message);
    }

}

getWeeklyForecast();