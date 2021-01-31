import React, { Component } from "react";
import RAIN from "../../../assets/image/Rain.svg";
import CLOUD from "../../../assets/image/Cloud.svg";
import SNOW from "../../../assets/image/Snow.svg";
import SUN from "../../../assets/image/Sun.svg";
import { API_CONFIG } from "./weather-const";

const defaultState = {
  loading: true,
  weatherList: [],
  selectedIndex: 0,
  error: null
};

const WeatherContext = React.createContext(defaultState);

class WeatherProvider extends Component {
  state = {
    loading: true,
    weatherList: [],
    selectedIndex: 0,
    error: null,
    updateSelected: (currentIndex) => {
      this.setState((state) => {
        return {
          ...state,
          selectedIndex: currentIndex
        };
      });
    },
    getIcon: function (iconCode) {
      let value;
      switch (true) {
        case iconCode === 800:
          value = SUN;
          break;
        case iconCode > 800:
          value = CLOUD;
          break;
        case iconCode < 800 && iconCode !== 300:
          value = RAIN;
          break;
        case iconCode === 300:
          value = SNOW;
          break;
        default:
          value = CLOUD;
      }
      return value;
    }
  };

  componentDidMount() {
    this.getWeather()
      .then(() => console.log("Have weather"))
      .catch((err) => console.error(err));
  }

  getWeather = async () => {
    let latitude = API_CONFIG.DEFAULT_LAT;
    let longitude = API_CONFIG.DEFAULT_LON;

    if (this.props.lat && this.props.lon) {
      latitude = this.props.lat;
      longitude = this.props.lon;
    }

    const API_url = `${API_CONFIG.ENDPOINT_DAILY}?lat=${latitude}&lon=${longitude}&key=${API_CONFIG.KEY}`;

    const res = await fetch(API_url, {
      headers: {
        Accept: "application/json"
      }
    });
    if (res.ok) {
      const response = await res.json();
      this.setState((state) => {
        return {
          ...state,
          weatherList: response.data.slice(0, 7),
          loading: false
        };
      });
    }
  };

  render() {
    const { children } = this.props;
    const {
      loading,
      weatherList,
      selectedIndex,
      error,
      updateSelected,
      getIcon
    } = this.state;
    return (
      <WeatherContext.Provider
        value={{
          loading,
          error,
          weatherList,
          selectedIndex,
          updateSelected,
          getIcon
        }}
      >
        {children}
      </WeatherContext.Provider>
    );
  }
}

export default WeatherContext;
export { WeatherProvider };
