import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from 'app/location.service';

@Component({
  selector: 'app-forecasts-list',
  templateUrl: './forecasts-list.component.html',
  styleUrls: ['./forecasts-list.component.css']
})
export class ForecastsListComponent {

  zipcode: string;
  forecast: any;

  constructor(
    private weatherService: WeatherService,
    route: ActivatedRoute,
    private locationService: LocationService) {
    route.params.subscribe(params => {
      this.zipcode = params['zipcode'];
      let location = this.locationService.locations.find((el) => el.zipcode == this.zipcode)
      weatherService.getForecast(this.zipcode, location ? location["id"] : "us")
        .subscribe(data => this.forecast = data);
    });
  }
}
