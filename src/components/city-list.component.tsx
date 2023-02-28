import { Component } from "react";
import CityDataService from "../services/weather.service";
import IWeatherData from '../types/weather.type';

type Props = {
  checked: boolean
};

type State = {
  cities: Array<IWeatherData>,
  currentCity: IWeatherData | null,
  currentIndex: number,
};

const cityList = ["Ottawa", "Toronto", "Vancouver", "Montreal", "Quebec", "Winnipeg", "Calgary"]

export default class CityList extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.retrieveCities = this.retrieveCities.bind(this);
    this.setActiveCity = this.setActiveCity.bind(this);

    this.state = {
      cities: [],
      currentCity: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveCities();
  }

  getTemperature(t: number | undefined) {
    if (!t) return '';

    if (this.props.checked) {
      return Math.round(t - 273.15) + "&#176;C"
    } else {
      return Math.round((t - 273.15) * 9 / 5 + 32) + "&#176;F"
    }
  }

  getImageSource(w: string | undefined) {
    if (w === "Clear") {
      return "/assets/Sunny.png";
    } else if (w === "Rainy") {
      return "/assets/Rainy.png";
    } else if (w === "Snowy") {
      return "/assets/Snowy.png";
    } else {
      return "/assets/Partly Cloudy.png";
    }
  }

  retrieveCities() {
    const all = cityList.map(name => CityDataService.get(name))
    Promise.all(all).then(response => {
      this.setState({
        cities: response.map(({data}) => data),
        currentIndex: 0,
        currentCity: response[0].data
      })
    })
  }

  setActiveCity(index: number) {
    this.setState({
      currentCity: this.state.cities[index],
      currentIndex: index
    });
  }

  render() {
    const { cities, currentCity } = this.state;

    return (
      <div className="row-lg col p-0 p-lg-5 h-100 d-flex flex-lg-row flex-column-reverse" style={{ color: "#555" }}>
        <div className="row-12 col-lg-4 p-0 bg-white rounded city-list">
          <div className="h5 pb-3 pt-4 px-3 border-bottom mb-0">
            <strong>Favorite Locations</strong>
          </div>
          <div className="mobile-force-scroll">
            {cities.map((city, index) => <div 
              key={city.name} 
              className="p-3 border-bottom d-flex align-items-center" 
              style={{ 
                cursor: 'pointer', 
                overflowY: 'auto', 
                background: index === this.state.currentIndex ? 'rgb(201, 236, 254)' : 'white'}} 
              onClick={() => this.setActiveCity(index)}
            >
              <img src={this.getImageSource(city.weather[0].main)} alt={city.weather[0].main} width={40} height={40} className="mr-3"/>
              <div className="h5 mb-0">{city.name}, {city.sys.country}</div>
            </div>)}
          </div>
        </div>
        <div className="row-12 col-lg-8 pl-0 pl-lg-5 pr-0 main-content">
          <div className="bg-white rounded h-100">
            <div className="h4 h5-lg pb-3 pt-4 px-lg-3 content-header text-center text-lg-left mb-0">
              <strong>{currentCity ? currentCity?.name + ', ' + currentCity?.sys.country : ''}</strong>
            </div>
            {currentCity &&
            <>
              <div className="d-flex flex-column flex-lg-row align-items-center mt-lg-4">
                <img src={this.getImageSource(currentCity?.weather[0].main)} alt={currentCity?.weather[0].main} className="mx-5 main-icon"/>
                <div className="pt-2 pt-lg-5 text-center">
                  <div className="h1" dangerouslySetInnerHTML={{ __html: this.getTemperature(currentCity.main.temp) }} />
                  <div className="h4">{currentCity?.weather[0].description}</div>
                </div>
              </div>
              <div className="ml-5 mt-4 only-desktop">
                <div className="h4">Wind: {currentCity.wind?.deg}&#176; {currentCity.wind?.speed}m/s</div>
                <div className="h4">Visibility: {currentCity.visibility}</div>
                <div className="h4">GPS: {currentCity.coord.lat} {currentCity.coord.lon}</div>
              </div>
            </>
            }
          </div>
        </div>
      </div>
    );
  }
}
