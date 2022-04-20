import { Component, Input, TemplateRef } from "@angular/core";

@Component({
    selector: 'app-multi-state-button',
    templateUrl: './multi-state-button.component.html'
})
export class MultiStateButton{
    @Input()
    currentTemplate: TemplateRef<any>;
}