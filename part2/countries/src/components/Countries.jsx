const CountryList = ({ countries }) => {
  return (
    <ul>
      {countries.map((country, index) => (
        <li key={index}>{country.name.common}</li>
      ))}
    </ul>
  )
}

const Country = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <div>capital  {country.capital[0]}</div>
      <div>area  {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((language, index) => <li key={index}>{language}</li>)}
      </ul>
      <img src={country.flags.png}></img>
    </>
  )
}

const Countries = ({ countries }) => {
  if (countries === null || countries.length === 0)
    return

  if (countries.length > 10) {
    console.log("length > 10")
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length > 1) {
    console.log("length > 1")
    return <CountryList countries={countries} />
  } else {
    console.log("one country: ", countries[0])
    return <Country country={countries[0]} />
  }
}


export default Countries