import readline from 'readline/promises';

const API_KEY = '93bb648671f5f7aac0fd066bec32e023';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getWeather = async (city) => {
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`City not found. Please check the city name.`);
        }
        const weatherData = await response.json();

        console.log(`\nWeather Information:`);
        console.log(`City: ${weatherData.name}`);
        console.log(`Temperature: ${weatherData.main.temp}`);
        console.log(`Description: ${weatherData.weather[0].description}`);
        console.log(`Humidity: ${weatherData.main.humidity}`);
        console.log(`Wind Speed: ${weatherData.wind.speed}`);

    } catch(err) {
        console.log(`Error happened in calling api: ${err}`)
    }
}


const city = await rl.question('Enter city name: ');
await getWeather(city);
rl.close();

