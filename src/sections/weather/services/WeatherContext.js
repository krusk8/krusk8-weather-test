import React, { Component } from "react";
import RAIN from "../../../assets/image/Rain.svg";
import CLOUD from "../../../assets/image/Cloud.svg";
import SNOW from "../../../assets/image/Snow.svg";
import SUN from "../../../assets/image/Sun.svg";

const defaultState = {
  loading: true,
  weatherList: [],
  selectedIndex: 0,
  error: null
};

const WeatherContext = React.createContext(defaultState);

//Free API only pass the single info of Today
const fakeResponseList = function (firstElement) {
  let list = [];
  list.push(firstElement);
  const currentDate = new Date(firstElement.ob_time);
  const listIconFake = [300, 800, 200, 900];
  for (let i = 0; i < 6; i++) {
    const modifiedDate = new Date(firstElement.ob_time).setDate(
      currentDate.getDate() + i + 1
    );
    const updatedObj = {
      ...firstElement,
      ob_time: modifiedDate,
      temp: firstElement.temp + i,
      app_temp: firstElement.app_temp + i,
      rh: firstElement.rh + i,
      weather: {
        ...firstElement.weather,
        code: listIconFake[Math.floor(Math.random() * listIconFake.length)]
      }
    };
    list.push(updatedObj);
  }
  return list;
};
class WeatherProvider extends Component {
  state = {
    loading: true,
    weatherList: [],
    selectedIndex: 0,
    error: null,
    updateSelected: (currentIndex) => {
      console.log("Clicked " + currentIndex);
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
    let latitude = "41.902782";
    let longitude = "12.496366";

    if (this.props.lat && this.props.lon) {
      latitude = this.props.lat;
      longitude = this.props.lon;
    }

    //TODO externalize the consts
    const API_current = "https://api.weatherbit.io/v2.0/current";
    const API_key = "c7659783fd4849b5a596a262114bdf68";
    const API_url = `${API_current}?lat=${latitude}&lon=${longitude}&key=${API_key}`;

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
          weatherList: fakeResponseList(response.data[0]),
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
