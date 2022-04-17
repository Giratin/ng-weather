import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class ButtonService {
    public buttonSubject: Subject<string> = new Subject<string>();

    onStartAddLocation(){
        this.buttonSubject.next('loading')
    }
    onLocationAdded(){
        this.buttonSubject.next('done')
    }

}
