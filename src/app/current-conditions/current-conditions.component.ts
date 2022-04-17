import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from "../weather.service";
import { LocationService } from "../location.service";
import { Router } from "@angular/router";
import { interval, Subscription } from 'rxjs';

const INTERVAL = 30000;

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent implements OnInit, OnDestroy {

  constructor(
    private weatherService: WeatherService,
    private locationService: LocationService,
    private router: Router
  ) {
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  currentConditions = [];
  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.currentConditions = this.getCurrentConditions();
    this.refreshData();
  }

  refreshData(): void {
    this.subscription = interval(INTERVAL)
      .subscribe(data => {
        this.weatherService.refreshData(this.locationService.locations);
        this.currentConditions = this.getCurrentConditions();
      });
  }

  private getCurrentConditions() {
    return this.weatherService.getCurrentConditions();
  }

  showForecast(zipcode: string) {
    this.router.navigate(['/forecast', zipcode])
  }
}
