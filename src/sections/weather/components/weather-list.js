import React, { Component } from "react";
import WeatherItem from "./weather-item";
import "./weather-list.scss";
const getTemperature = function (temp) {
  return `${Math.round(temp)}° - ${Math.round(temp - 6)}°`;
};

class WeatherList extends Component {
  render() {
    return (
      <div className="stacked-group">
        {this.props.listW.map((item, index) => {
          return (
            <div
              onClick={() => {
                this.props.callbackCLick(index);
              }}
              key={index}
              className="card"
            >
              <WeatherItem
                singleDate={item.ob_time}
                icon={this.props.resolveIcon(item.weather.code)}
                temperature={getTemperature(item.temp)}
                currentIndex={index}
                isSelected={index === this.props.selectedIndex}
              ></WeatherItem>
            </div>
          );
        })}
      </div>
    );
  }
}

export default WeatherList;
