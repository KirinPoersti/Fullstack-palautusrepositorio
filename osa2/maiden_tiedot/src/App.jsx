import { useEffect, useState } from 'react'
import axios from 'axios'

const CountryDetails = ({ country }) => {
  const languages = Object.values(country.languages ?? {})
  const capital = country.capital?.[0]
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
  const [weatherReport, setWeatherReport] = useState(null)

  useEffect(() => {
    if (!capital || !apiKey) {
      return
    }

    let ignore = false

    axios
      .get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: capital,
          appid: apiKey,
          units: 'metric',
        },
      })
      .then(response => {
        if (!ignore) {
          setWeatherReport({ capital, data: response.data })
        }
      })

    return () => {
      ignore = true
    }
  }, [capital, apiKey])

  const weather = weatherReport?.capital === capital
    ? weatherReport.data
    : null

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital {capital ?? 'unknown'}</div>
      <div>Area {country.area}</div>

      <h2>Languages</h2>
      <ul>
        {languages.map(language => <li key={language}>{language}</li>)}
      </ul>

      <img src={country.flags.png} alt={country.flags.alt ?? `Flag of ${country.name.common}`} width="160" />

      {capital && (
        <div>
          <h2>Weather in {capital}</h2>
          {!apiKey && <div>Weather API key is missing</div>}
          {weather && (
            <div>
              <div>Temperature {weather.main.temp} Celsius</div>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
              <div>Wind {weather.wind.speed} m/s</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const Countries = ({ countries, handleShowCountry }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  if (countries.length > 1) {
    return (
      <div>
        {countries.map(country => (
          <div key={country.cca3}>
            {country.name.common} <button onClick={() => handleShowCountry(country.name.common)}>show</button>
          </div>
        ))}
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

  const handleShowCountry = (countryName) => {
    setFilter(countryName)
  }

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleFilterChange} />
      </div>
      <Countries countries={countriesToShow} handleShowCountry={handleShowCountry} />
    </div>
  )
}

export default App