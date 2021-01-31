import React, { Component } from "react";
import "./weather-page.scss";
import WeatherDetail from "./components/weather-detail";
import WeatherList from "./components/weather-list";
import WeatherContext, { WeatherProvider } from "./services/WeatherContext";
import SpinnerLoader from "../../common/components/spinner-loader";

let coordinate = {
  lat: "",
  lon: ""
};
class WeatherPage extends Component {
  constructor() {
    super();
    const search = window.location.search;
    const params = new URLSearchParams(search);
    coordinate.lat = params.get("lat");
    coordinate.lon = params.get("lon");
  }
  render() {
    return (
      <WeatherProvider lat={coordinate.lat} lon={coordinate.lon}>
        <WeatherContext.Consumer>
          {({
            weatherList,
            loading,
            selectedIndex,
            getIcon,
            updateSelected
          }) => {
            if (loading) {
              return <SpinnerLoader />;
            }
            return (
              <div className="WeatherPage">
                <div className="bitmap">
                  <WeatherDetail
                    cityName={weatherList[selectedIndex].city_name}
                    temp={weatherList[selectedIndex].temp}
                    tempFeel={weatherList[selectedIndex].app_min_temp}
                    humidity={weatherList[selectedIndex].rh}
                    icon={getIcon(weatherList[selectedIndex].weather.code)}
                  />
                  <div className="divider"></div>
                  <WeatherList
                    listW={weatherList}
                    selectedIndex={selectedIndex}
                    callbackCLick={updateSelected}
                    resolveIcon={getIcon}
                  />
                </div>
              </div>
            );
          }}
        </WeatherContext.Consumer>
      </WeatherProvider>
    );
  }
}

export default WeatherPage;
