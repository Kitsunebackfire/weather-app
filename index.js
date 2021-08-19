const searchForm = document.getElementById("searchForm");
const searchFormInput = document.getElementById("searchInput");

const displayedWeatherDescription =
  document.getElementById("weatherDescription");
const displayedLocation = document.getElementById("location");
const displayedTemp = document.getElementById("displayedTemp");
const displayedFeelsLike = document.getElementById("feelsLike");
const displayedWindSpeed = document.getElementById("windSpeed");
const displayedHumidity = document.getElementById("humidity");

async function retreiveWeather(location) {
  try {
    const retreivedData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=1e7c32808ec4dc6f51ae92399c20c43b`
    );
    const jsonData = await retreivedData.json();
    return jsonData;
  } catch (error) {
    console.log(
      `${error}, error has been caught initially while being api info. `
    );
  }
}

async function showWeather(weatherData) {
  try {
    const passedThroughData = await weatherData;
    console.log(weatherData);
    // location data
    const city = passedThroughData["name"];
    const country = passedThroughData["sys"].country;
    // temperature info

    const temp = Math.round(kelvinToFahrenheit(passedThroughData["main"].temp));
    const feelsLikeTemp = Math.round(
      kelvinToFahrenheit(passedThroughData["main"].feels_like)
    );
    // general weather info
    const weatherDescription = passedThroughData["weather"]["0"].description;
    const wind = Math.round(parseInt(passedThroughData["wind"].speed));
    const humidity = Math.round(passedThroughData["main"].humidity);
    console.log(feelsLikeTemp);

    displayControl(
      city,
      country,
      temp,
      feelsLikeTemp,
      weatherDescription,
      wind,
      humidity
    );
  } catch (error) {
    console.log(`${error}, weather data not passed through to show info`);
  }
}

function displayControl(
  city,
  country,
  temp,
  feelsLikeTemp,
  weatherDescription,
  wind,
  humidity
) {
  displayedWeatherDescription.innerText = weatherDescription;
  displayedLocation.innerText = `${city}, ${country}`;
  displayedTemp.innerText = temp;
  displayedFeelsLike.innerText = `Feels like: ${feelsLikeTemp}°F`;
  displayedWindSpeed.innerText = `Wind speed: ${wind} MPH`;
  displayedHumidity.innerText = `Humidity: ${humidity}%`;
}

function kelvinToFahrenheit(kelvin) {
  let kelvinInt = parseInt(kelvin);
  let fahrenheit = (kelvinInt - 273.15) * (9 / 5) + 32;
  return fahrenheit;
}

function getInput(searchFormInput) {
  searchFormInputValue = searchFormInput.value;
  showWeather(retreiveWeather(searchFormInputValue));
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getInput(searchFormInput);
});

showWeather(retreiveWeather("Keller"));
