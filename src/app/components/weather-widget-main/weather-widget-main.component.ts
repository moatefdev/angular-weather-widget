import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-widget-main',
  templateUrl: './weather-widget-main.component.html',
  styleUrls: ['./weather-widget-main.component.css'],
})
export class WeatherWidgetMainComponent implements OnInit {
  WeatherData: any;

  constructor() {}

  ngOnInit(): void {
    this.WeatherData = {
      main: {},
      isDay: true,
    };
    this.getWeatherData();
    console.log(this.WeatherData);
  }

  // tslint:disable-next-line: typedef
  getWeatherData() {
    fetch(
      'http://api.openweathermap.org/data/2.5/weather?q=Cairo&appid=4722c0e91db15b27b712f1249d6b5b90'
    )
      .then((response) => response.json())
      .then((data) => {
        this.setWeatherData(data);
      });
    // const data = JSON.parse(
    // tslint:disable-next-line: max-line-length
    //   '{"coord":{"lon":31.2497,"lat":30.0626},"weather":[{"id":800,"main":"Clear","description":"clearsky","icon":"01n"}],"base":"stations","main":{"temp":291.71,"feels_like":286.91,"temp_min":290.93,"temp_max":292.15,"pressure":1015,"humidity":45},"visibility":10000,"wind":{"speed":5.66,"deg":80},"clouds":{"all":0},"dt":1612213495,"sys":{"type":1,"id":2514,"country":"EG","sunrise":1612154724,"sunset":1612193500},"timezone":7200,"id":360630,"name":"Cairo","cod":200}'
    // );
    // this.setWeatherData(data);
  }

  // tslint:disable-next-line: typedef
  setWeatherData(data: any) {
    this.WeatherData = data;
    const sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    const currentDate = new Date();
    this.WeatherData.isDay = currentDate.getTime() < sunsetTime.getTime();
    this.WeatherData.temp_celcius = (
      this.WeatherData.main.temp_min - 273.15
    ).toFixed(0);
    this.WeatherData.temp_min = (
      this.WeatherData.main.temp_min - 273.15
    ).toFixed(0);
    this.WeatherData.temp_max = (
      this.WeatherData.main.temp_max - 273.15
    ).toFixed(0);
    this.WeatherData.temp_feels_like = (
      this.WeatherData.main.feels_like - 273.15
    ).toFixed(0);
  }
}
