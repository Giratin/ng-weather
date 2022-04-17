

import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-country-filter',
    templateUrl: './country-filter.component.html',
    styleUrls: ['./country-filter.component.css']
})
export class CountryFilterComponent implements OnInit, OnDestroy, OnChanges {

    @ViewChild('myInputautocomplete', { static: false }) myInputautocomplete: ElementRef;
    @Output() onSelect: EventEmitter<any> = new EventEmitter();
    @Input() clear: boolean = false;

    constructor(
        private http: HttpClient,
        private renderer: Renderer2
    ) { }
    
    ngOnChanges(changes: SimpleChanges): void {
       if(this.clear){
           this.clearList();
           this.countrySearch = "";
       }
    }

    subscription: Subscription = new Subscription();
    countrySearch: string = "";
    countryList = [];
    countryJson = [];

    ngOnInit(): void {
        this.subscription = this.http.get('/assets/countries.json').subscribe((countries) => {
            this.countryJson = countries as Array<any>;
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    onKeyPressed(e) {
        this.clearList();
        this.countrySearch = this.countrySearch.trim();
        if (this.countrySearch != "") {
            for (var i = 0; i < this.countryJson.length; i++) {
                if (this.countryJson[i]["name"].substr(0, this.countrySearch.length).toUpperCase() == this.countrySearch.toUpperCase()) {
                    this.createCountryInput(this.countryJson[i]["code"], this.countrySearch.length, this.countryJson[i]["name"]);
                }
            }
        }
    }
    onFocus(e) {
        for (var i = 0; i < this.countryJson.length; i++) {
            this.createCountryInput(this.countryJson[i]["code"], 0, this.countryJson[i]["name"]);
        }
    }

    createCountryInput(id, strLength, country) {
        const element = this.renderer.createElement('div');
        this.renderer.setProperty(element, 'id', id);
        element.innerHTML = `<strong>${country.substr(0, strLength)}</strong>`;
        element.innerHTML += country.substr(strLength);
        element.innerHTML += `<input type='hidden' name='${id}' value='${country}' />`;

        this.renderer.listen(element, 'click', (e: PointerEvent) => {
            let item = this.myInputautocomplete.nativeElement.querySelector(`[name="${e.target["id"]}"]`) as HTMLInputElement;
            this.onSelect.emit({ country: item.value, id: e.target["id"] });
            this.countrySearch = item.value;
            this.clearList();
        })
        this.renderer.appendChild(this.myInputautocomplete.nativeElement, element);
    }

    clearList() {
        Array.from(this.myInputautocomplete.nativeElement.children).forEach(child => {
            this.renderer.removeChild(this.myInputautocomplete.nativeElement, child);
        });
    }

}
