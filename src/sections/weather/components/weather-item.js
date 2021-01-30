import React, { Component } from "react";
import "./weather-item.scss";

//import icons
const weeknames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const formatDate = function (ob_time) {
  const currentDay = new Date(ob_time);
  const name = weeknames[currentDay.getDay()];
  return name + " " + currentDay.getDate();
};

class WeatherItem extends Component {
  render() {
    return (
      <div className={`WeatherItem ${this.props.isSelected ? "selected" : ""}`}>
        <div className="wheater-day">
          <div className="day">{formatDate(this.props.singleDate)}</div>
          <div className="weather">
            <img src={this.props.icon} alt="icon" />
          </div>
          <div className="temperature">{this.props.temperature}</div>
        </div>
      </div>
    );
  }
}
WeatherItem.propTypes = {};

export default WeatherItem;
