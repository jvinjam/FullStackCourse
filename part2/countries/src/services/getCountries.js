import axios from 'axios'

// const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'
// const getAllUrl = '/api/all'
// const getCountryUrl = '/api/name/'
const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => {
  return axios.get(url)
    .then(response => response.data)
}

// const getCountryByName = country => {
//   return axios.get(baseUrl + getCountryUrl + country)
//     .then(response => response.data)
// }

//export default { getAll, getCountryByName }
export default { getAll }