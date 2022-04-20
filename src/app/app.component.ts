import { AfterContentChecked, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, HostListener, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { interval, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor() { }
}
