import { Component, NgZone } from '@angular/core';
import { ApiService } from 'src/shared/services/api.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent {
  myWeather: any;
  temperature: number = 0;
  feelsLikeTemp: number = 0;
  humidity: number = 0;
  pressure: number = 0;
  summary: string = '';
  iconURL: string = '';
  city: string = 'Lucknow';

  constructor(private weatherService: ApiService,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather(city?: string) {
    if (city) {
      this.city = city;
    }
    
    this.weatherService.getWeather(this.city).subscribe(
      (res) => {
        console.log(res);
        this.myWeather = res;
        console.log(this.myWeather);
        this.temperature = this.myWeather.main.temp;
        this.feelsLikeTemp = this.myWeather.main.feels_like;
        this.humidity = this.myWeather.main.humidity;
        this.pressure = this.myWeather.main.pressure;
        this.summary = this.myWeather.weather[0].main;

        this.ngZone.run(() => {
          this.iconURL = 'https://openweathermap.org/img/wn/' + this.myWeather.weather[0].icon + '@2x.png';
        });
      },
      (error) => console.log(error.message),
      () => console.info('API call completed')
    );
  }

}