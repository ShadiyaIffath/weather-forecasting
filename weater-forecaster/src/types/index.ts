export type optionType = {
  name: string
  lon: number
  lat: number
  country: string
}

export type forecastType = {
  name: string
  country: string
  sunrise: number
  sunset: number
  list: [
    {
      dt: number
      main: {
        feels_like: number
        humidity: number
        pressure: number
        temp: number
        temp_min: number
        temp_max: number
      }
      weather: [
        {
          main: string
          icon: string
          description: string
        }
      ]
      wind: {
        speed: number
        deg: number
        gust: number
      }
      cloud: {
        all: number
      }
      pop: number
      visibility: number
    }
  ]
}
