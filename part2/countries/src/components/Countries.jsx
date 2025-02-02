import { useState, useEffect } from 'react'

import weatherService from './../services/getCountries'

const CountryList = ({ countries, onShow }) => {
  return (
    <ul>
      {countries.map((country, index) => (
        <li key={index}>{country.name.common} <button onClick={() => onShow(country.name.common)}>show</button></li>
      ))}
    </ul>
  )
}

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    weatherService.getWeather(country.capital[0], country.cca2)
      .then(response => setWeather(response))
      .catch(error => console.log('error : ', error.response.statusText))
  }, [])

  return (
    <>
      <h1>{country.name.common}</h1>
      <div>capital  {country.capital[0]}</div>
      <div>area  {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((language, index) => <li key={index}>{language}</li>)}
      </ul>
      <img className='flag' src={country.flags.png}></img>
      <Weather info={weather} />
    </>
  )
}

const Weather = ({ info }) => {
  const baseIconUrl = 'https://openweathermap.org/img/wn/'
  if (info == null)
    return

  const iconUrl = baseIconUrl + info.weather[0].icon + '@2x.png'

  return (
    <>
      <h2>Weather in {info.name}</h2>
      <div>temperature  {info.main.temp} Celcius</div>
      <img src={iconUrl} />
      <div>wind  {info.wind.speed} m/s</div>
    </>
  )
}

const Countries = ({ countries, onShow }) => {
  if (countries === null || countries.length === 0)
    return

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length > 1) {
    return <CountryList countries={countries} onShow={onShow} />
  } else {
    return <Country country={countries[0]} />
  }
}


export default Countries