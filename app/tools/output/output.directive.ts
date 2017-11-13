import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[output-host]',
})
export class OutputDirective {
    data: any;
    data_type: string;

    constructor(public viewContainerRef: ViewContainerRef) {

    }

   
}