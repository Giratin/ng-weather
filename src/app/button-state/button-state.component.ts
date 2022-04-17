import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ButtonService } from "app/button.service";
import { BehaviorSubject, Subscription } from "rxjs";

@Component({
    selector: 'app-button-state',
    templateUrl: './button-state.component.html',
    styleUrls: ['./button-state.component.css']
})
export class ButtonStateComponent implements OnInit, OnDestroy {

    @Input() btnClass = 'btn';
    
    constructor(private buttonService: ButtonService) {
    }

    subscription: Subscription;

    isDisabled: boolean = false;
    currentState: string = ""; // 'show-spinner' | 'show-icon' | ''
    text: string = '';
    btnClassDerived: string = '';

    ngOnInit(): void {
        this.subscription = this.buttonService.buttonSubject.subscribe((value) => {
            switch (value) {
                case 'loading': {
                    this.isDisabled = true;
                    this.currentState = "show-spinner"
                    this.text = 'Adding';
                    this.btnClassDerived = '';
                    break;
                }
                case 'done': {
                    this.isDisabled = true;
                    this.currentState = "show-icon"
                    this.text = 'Done';
                    this.btnClassDerived = 'btn-success';
                    setTimeout(()=>{
                        this.isDisabled = false;
                        this.currentState = ""
                        this.btnClassDerived = '';
                        this.text = '';
                    },500)
                    break;
                }
                default: {
                    this.isDisabled = false;
                    this.text = '';
                    this.btnClassDerived = '';
                    break;
                }
            }
        })
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}