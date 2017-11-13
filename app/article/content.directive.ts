import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[content-host]',
})
export class ContentDirective {
    data: any;
    constructor(public viewContainerRef: ViewContainerRef) { }
}