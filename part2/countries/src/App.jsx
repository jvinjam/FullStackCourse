import { useState, useEffect } from 'react'

import Countries from './components/Countries'
import countryService from './services/getCountries'

import './App.css'

const App = () => {
  const [countries, setCountries] = useState(null)
  const [filter, setFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState(null)

  //fetch initial data
  useEffect(() => {
    countryService.getAll()
      .then(initialData => setCountries(initialData))
      .catch(error => console.log('error : ', error.response.statusText))
  }, [])

  const handleFilter = (event) => {
    const searchStr = event.target.value
    setFilter(searchStr)
    if (countries !== null && searchStr.length > 0)
      setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(searchStr.toLowerCase())))
    else
      setFilteredCountries(countries)
  }

  // useEffect(() => {
  //   if (countries !== null && filter.length > 0)
  //     setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase())))
  //   else
  //     setFilteredCountries(countries)
  // }, [filter])

  //filter countries using search string - we can use this if there is no show button
  // const filteredCountries = (countries !== null) && filter.length > 0 ?
  //   countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  //   : countries

  const onShow = (countryName) => {
    countryService.getCountryByName(countryName)
      .then(response => setFilteredCountries([response]))
      .catch(error => console.log('error : ', error.response.statusText))
  }

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleFilter} />
      </div>
      <Countries countries={filteredCountries} onShow={onShow} />
    </div>
  )
}

export default App

