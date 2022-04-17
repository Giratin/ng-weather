import { Component, ElementRef, ViewChild } from '@angular/core';
import { ButtonService } from 'app/button.service';
import {LocationService} from "../location.service";

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html'
})
export class ZipcodeEntryComponent {

  constructor(
      private service : LocationService, 
      private buttonService: ButtonService
    ) { }
  @ViewChild('zipcode') zipcode: ElementRef;
  selectedCountry: string = 'us';
  clearSearch: boolean = false;

  addLocation(zipcode : string){
    this.buttonService.onStartAddLocation();
    this.clearSearch = true;
   ( <HTMLInputElement>this.zipcode.nativeElement).value = "";
    
    setTimeout(()=>{
      this.service.addLocation(zipcode, this.selectedCountry);
      this.clearSearch = false;
    },1000)
  }

  getCountrySelected(country){
    this.selectedCountry = country['id'].toLowerCase();
  }

}
