import React, { Component } from "react";
import WeatherItem from "./weather-item";
import "./weather-list.scss";
const getTemperature = function (max_temp, min_temp) {
  return `${Math.round(max_temp)}° - ${Math.round(min_temp)}°`;
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
                singleDate={item.valid_date}
                icon={this.props.resolveIcon(item.weather.code)}
                temperature={getTemperature(item.max_temp, item.min_temp)}
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
