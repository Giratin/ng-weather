import { Injectable } from '@angular/core';
import { ButtonService } from './button.service';
import { WeatherService } from "./weather.service";

export const LOCATIONS: string = "locations";

@Injectable()
export class LocationService {

  locations: any[] = [];

  constructor(private weatherService: WeatherService, private buttonService: ButtonService) {
    let locString = localStorage.getItem(LOCATIONS);
    if (locString)
      this.locations = JSON.parse(locString);
    for (let loc of this.locations)
      this.weatherService.addCurrentConditions(loc.zipcode, loc.id);
  }

  addLocation(zipcode: string, countryId: string) {
    this.locations.push({ zipcode, id: countryId });
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
    this.weatherService.addCurrentConditions(zipcode, countryId);
    this.buttonService.onLocationAdded();
  }

  removeLocation(zipcode: string) {
    this.locations = this.locations.filter((countryObj) => {
      return countryObj.zipcode != zipcode;
    })
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
    this.weatherService.removeCurrentConditions(zipcode);
  }
}
