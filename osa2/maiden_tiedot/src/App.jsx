import { useEffect, useState } from 'react'
import axios from 'axios'

const CountryDetails = ({ country }) => {
  const languages = Object.values(country.languages ?? {})

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital {country.capital?.[0] ?? 'unknown'}</div>
      <div>Area {country.area}</div>

      <h2>Languages</h2>
      <ul>
        {languages.map(language => <li key={language}>{language}</li>)}
      </ul>

      <img src={country.flags.png} alt={country.flags.alt ?? `Flag of ${country.name.common}`} width="160" />
    </div>
  )
}

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  if (countries.length > 1) {
    return (
      <div>
        {countries.map(country => <div key={country.cca3}>{country.name.common}</div>)}
      </div>
    )
  }

  if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />
  }

  return null
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = filter.length === 0
    ? []
    : countries.filter(country =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleFilterChange} />
      </div>
      <Countries countries={countriesToShow} />
    </div>
  )
}

export default App