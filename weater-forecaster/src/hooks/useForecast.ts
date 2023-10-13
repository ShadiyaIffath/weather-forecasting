import { useState, useEffect, ChangeEvent } from 'react'
import { forecastType, optionType } from '../types'

const useForecast = () => {
  const API_KEY: string = process.env.REACT_APP_WEATHER_API_KEY as string
  const [options, setOptions] = useState<[]>([])
  const [city, setCity] = useState<optionType | null>(null)
  const [place, setPlace] = useState<string>('')
  const [forecast, setForecast] = useState<forecastType | null>(null)

  const getSearchOptions = (search: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${search.trim()}&limit=5&appid=${API_KEY}`
    ).then((res) => {
      if (res.ok) {
        res.json().then((data) => setOptions(data))
      } else {
        setOptions([])
      }
    })
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setPlace(value)

    if (value === '' || value == null) return

    if (place != null && typeof place != 'undefined') {
      getSearchOptions(place)
    }
  }

  const getForecast = (city: optionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${API_KEY}`
    ).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          const forecastData = {
            ...data.city,
            list: data.list.splice(16),
          }
          setForecast(forecastData)
        })
      }
    })
  }

  const onOptionSelect = (option: optionType) => {
    setCity(option)
  }

  const onSubmit = () => {
    if (city == null) return
    getForecast(city)
  }

  useEffect(() => {
    if (city != null) {
      setPlace(city.name)
      setOptions([])
    }
  }, [city])

  return { place, options, forecast, onInputChange, onOptionSelect, onSubmit }
}

export default useForecast
