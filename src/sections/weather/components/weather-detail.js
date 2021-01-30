import React, { Component } from "react";
import "./weather-detail.scss";
import placeholder from "../../../assets/image/placeholder.svg";

class WeatherDetail extends Component {
  render() {
    return (
      <div className="WeatherDetail">
        <div className="top-content">
          <div className="location">
            <div className="placeholder">
              <img src={placeholder} alt="icon" />
            </div>
            <div className="city">{this.props.cityName}</div>
          </div>
          <div className="weahter-icon">
            <img src={this.props.icon} alt="icon" />
          </div>
          <div className="temperature">{Math.round(this.props.temp)}°</div>
          <div className="other-data">
            <div className="feels-like">
              Feels Like: {Math.round(this.props.tempFeel)}°
            </div>
            <div className="humidity">
              Humidity: {Math.round(this.props.humidity)}%
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherDetail;
