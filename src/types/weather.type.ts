
export interface IWeather {
  main: string,
  description: string,
  icon: string
}

export default interface IWeatherData {
  name: string,
  clouds?: {
    all: number,
  }
  wind?: {
    speed: number,
    deg: number,
    gust: number
  },
  coord: {
    lon: number,
    lat: number
  },
  visibility: number,
  weather: [IWeather]
  sys: {
    country: string,
  },
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number,
    sea_level?: number,
    grnd_level?: number
  }
}