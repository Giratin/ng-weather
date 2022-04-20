import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ButtonService } from 'app/button.service';
import { Subscription, timer } from 'rxjs';
import { LocationService } from "../location.service";

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html',
  styleUrls: ['./zipcode-entry.component.css']
})
export class ZipcodeEntryComponent implements AfterViewInit, OnDestroy {

  doneTimer = timer(1000);

  constructor(
    private service: LocationService,
    private buttonService: ButtonService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  @ViewChild('zipcode') zipcode: ElementRef;
  @ViewChild('save') initialTemplate: TemplateRef<any>;
  @ViewChild('saving') workingTemplate: TemplateRef<any>;
  @ViewChild('saved') doneTemplate: TemplateRef<any>;
  isDisabled: boolean = false;
  currentTemplate: TemplateRef<any>;

  selectedCountry: string = 'us';
  clearSearch: boolean = false;

  subscription: Subscription;

  ngAfterViewInit(): void {
    this.currentTemplate = this.initialTemplate;
    this.cdr.detectChanges();
  }

  addLocation(zipcode: string) {
    this.isDisabled = true;
    this.currentTemplate = this.workingTemplate;
    this.buttonService.onStartAddLocation();

    this.subscription = this.buttonService.buttonSubject.subscribe((value) => {
      switch (value) {
        case 'loading': {
          this.isDisabled = true;
          this.currentTemplate = this.workingTemplate;
          break;
        }
        case 'done': {
          this.isDisabled = true;
          this.currentTemplate = this.doneTemplate
          this.doneTimer.subscribe(()=>{
            this.currentTemplate = this.initialTemplate;
            this.isDisabled = false;
          });
          break;
        }
        default: {
          this.isDisabled = false;
          this.currentTemplate = this.initialTemplate;
          break;
        }
      }
    });
    this.clearSearch = true;
    (<HTMLInputElement>this.zipcode.nativeElement).value = "";
    setTimeout(() => {
      this.service.addLocation(zipcode, this.selectedCountry);
      this.clearSearch = false;
    }, 1000)
  }

  getCountrySelected(country) {
    this.selectedCountry = country['id'].toLowerCase();
  }

}
