//http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid=28c630e710a5a9ca45311fe3c74c5367

const apiKey = '28c630e710a5a9ca45311fe3c74c5367'
const apiUrlGeo = 'https://api.openweathermap.org/geo/1.0/'
const apiUrlWeather = 'https://api.openweathermap.org/data/2.5/weather'

// Get elements from the DOM
const enterZip = document.getElementById("zip")
const searchBtn = document.getElementById("search")
const currentConditions = document.getElementById("current-conditions")
const currentTemp = document.getElementById("current-temp")
const tempHigh = document.getElementById("temp-high")
const tempLow = document.getElementById("temp-low")
const feelsLike = document.getElementById("feels-like")
const humidity = document.getElementById("humidity")
const city = document.getElementById("city")
const date = document.getElementById("date")

// Function to get weather data
async function getWeatherData() {
  try {
    // Get city info from zip code
    const responseGeo = await fetch(`${apiUrlGeo}zip?zip=${enterZip.value},us&appid=${apiKey}`)
    const dataGeo = await responseGeo.json()

    // Get weather data for the city
    const responseWeather = await fetch(`${apiUrlWeather}?lat=${dataGeo.lat}&lon=${dataGeo.lon}&units=imperial&appid=${apiKey}`)
    const dataWeather = await responseWeather.json()

    // Update the DOM with weather data
    currentConditions.innerText = dataWeather.weather[0].description
    currentTemp.innerText = `${Math.round(dataWeather.main.temp)}°F`
    tempHigh.innerText = `High: ${Math.round(dataWeather.main.temp_max)}°F`
    tempLow.innerText = `Low: ${Math.round(dataWeather.main.temp_min)}°F`
    feelsLike.innerText = `Feels like: ${Math.round(dataWeather.main.feels_like)}°F`
    humidity.innerText = `Humidity: ${dataWeather.main.humidity}%`
    city.innerText = dataGeo.name
    const now = new Date()
    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
    date.innerText = now.toLocaleDateString('en-US', options)
  } 
  catch (error) {
    console.log('Error:', error)
  }
}

// Event listener for search button click
searchBtn.addEventListener("click", () => {
  getWeatherData()
})

