import { useState, useEffect } from 'react'

import Countries from './components/Countries'
import countryService from './services/getCountries'

import './App.css'

// const Notification = ({ isError, message }) =>
//   <div className={isError ? 'error' : 'notification'} >
//     {message}
//   </div >

const App = () => {
  const [countries, setCountries] = useState(null)
  const [filter, setFilter] = useState('')

  //fetch initial data
  useEffect(() => {
    countryService.getAll()
      .then(initialData => setCountries(initialData))
      .catch(error => {
        console.log('error : ', error.response.statusText)
        // setErrorMessage({ isError: true, message: error.response.statusText })
        // clearMessage()
      })
  }, [])

  const handleFilter = (event) => setFilter(event.target.value)

  //filter countries using search string
  const filteredCountries = (countries !== null) && filter.length > 0 ?
    countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    : countries

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleFilter} />
      </div>
      <Countries countries={filteredCountries} />
    </div>
  )
}

export default App

