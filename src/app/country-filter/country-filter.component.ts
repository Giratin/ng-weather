

import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-country-filter',
    templateUrl: './country-filter.component.html',
    styleUrls: ['./country-filter.component.css']
})
export class CountryFilterComponent implements OnInit, OnDestroy, OnChanges {

    @ViewChild('searchRef') searchRef: ElementRef;
    @Output() onSelect: EventEmitter<any> = new EventEmitter();
    @Input() clear: boolean = false;

    constructor(
        private http: HttpClient,
    ) { }
    
    ngOnChanges(changes: SimpleChanges): void {
       if(this.clear){
           this.onListClear();
           this.searchRef.nativeElement.value = "";
       }
    }

    subscription: Subscription = new Subscription();
    countryList = [];
    countryJson = [];

    show: boolean = false;

    ngOnInit(): void {
        this.subscription = this.http.get('/assets/countries.json').subscribe((countries) => {
            this.countryJson = countries as Array<any>;
            this.countryList = this.countryJson;
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    onInputFocus(){
        this.show = true;
    }

    onKeyInputPressed(value){
        this.countryList = [];
        for (var i = 0; i < this.countryJson.length; i++) {
            if (this.countryJson[i]["name"].substr(0, value.length).toUpperCase() == value.toUpperCase()) {
                this.setCountry(value.length, this.countryJson[i]);
            }
        }
    }

    setCountry(strLength, country){
        let countryValue = `<strong>${country.name.substr(0, strLength)}</strong>${country.name.substr(strLength)}`         
        this.countryList.push({ ...country, html: countryValue });
    }

    onListClear(){
        this.show = false;
        this.countryList = this.countryJson;
    }

    selectCountry(country){
        this.onSelect.emit({ country: country.name, id: country.code });
        this.searchRef.nativeElement.value = country.name;
        this.onListClear();
    }

}
