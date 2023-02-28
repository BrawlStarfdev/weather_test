import http from "../http-common";
import IWeatherData from "../types/weather.type"

class WeatherDataService {
  get(city: string) {
    return http.get<IWeatherData>(`/weather?appid=0b2b81a261437681740509fa92d679f6&q=${city}`);
  }
}

export default new WeatherDataService();