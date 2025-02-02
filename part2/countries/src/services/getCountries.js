import axios from 'axios'

// variable api_key now has the value set in startup
const api_key = import.meta.env.VITE_SOME_KEY

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'
const getAllUrl = '/api/all'
const getCountryUrl = '/api/name/'

//'https://api.openweathermap.org/data/2.5/weather?q=Paris,FR&appid=YOUR_API_KEY'
const weatherUrlPart1 = 'https://api.openweathermap.org/data/2.5/weather?q='
const weatherUrlPart2 = '&units=metric&appid='

const getAll = () => {
  return axios.get(baseUrl + getAllUrl)
    .then(response => response.data)
}

const getCountryByName = (country) => {
  return axios.get(baseUrl + getCountryUrl + country)
    .then(response => response.data)
}

const getWeather = (capital, countryCode) => {
  return axios.get(`${weatherUrlPart1}${capital},${countryCode}${weatherUrlPart2}${api_key}`)
    .then(response => response.data)
}

export default { getAll, getCountryByName, getWeather }