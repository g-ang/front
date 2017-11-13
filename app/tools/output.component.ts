import {Component, Input, Output as Out, EventEmitter, OnInit,OnChanges,Type, AfterViewInit, ComponentFactoryResolver, OnDestroy, ViewChild} from '@angular/core';

import {FactoryService}from './tools.service';

import {Request, Header, Element, Attr, Seo, Screen, Output, App} from './app';

import {OutputDirective } from './output/output.directive';

import {PhotoComponent} from './output/photo.component';

import {TextComponent} from './output/text.component';

import {MyHistory, historyStock} from './output/history';

export class Content{
    constructor(public component: Type<any>,public data:any) {}
}

export interface OutputComponent {
    data: any;
    data_type: string;
    appid: string;
    history: MyHistory;

}

@Component({
    selector: 'output',
    templateUrl: './output.component.html',
    styleUrls: ['./output.component.css'],
})

export class OutputComponent implements OnInit,OnChanges {
    @Input('elements') elements: Element[];
    @Input('request') r: Request;
    @Input('app') app: App;
    private outputComp: OutputComponent;
    res: any;

    @ViewChild(OutputDirective) outputHost: OutputDirective;

    constructor(private server: FactoryService, private componentFactoryResolver: ComponentFactoryResolver) {

    }

    ngOnInit() {
        console.log(this.app.code);
    }

    ngOnChanges(e) {
        if (e.app && this.outputComp) {
            this.outputComp.data = null;
            this.outputHost.viewContainerRef.clear();  //清理
            this.outputComp.history = historyStock(e.app.currentValue.code);
        }
    }

    submit(v: any) {
        var data = {};
        this.elements.forEach(e => {
            if (e.name == "") {
                return;
            }
            if (e.type != "but") {
                data[e.name] = e.value;
            }
        });

        if (v && v.type == "but" && v.name!="") {
            data[v.name] = v.value;
        }

        if (this.app && this.app.id != '') {
            this.server.post(`/common/api/req/${this.app.id}`, data).subscribe((res: any) => {
                this.res = res;

                if (res.isSucc){
                    var item: Content;
                    switch (this.app.output.screen) {
                        case 'photo':
                            item = new Content(PhotoComponent,res.data);
                            break;
                        case 'text':
                            item = new Content(TextComponent,res.data);
                            break;
                    }
                    this.loadComponent(item, this.app.output.data_type, this.app.code);
                }
            })
        }
    }

    loadComponent(item: Content, data_type: string, appid: string) {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(item.component);
      
        let viewContainerRef = this.outputHost.viewContainerRef;
        viewContainerRef.clear();

        let componentRef = viewContainerRef.createComponent(componentFactory);
        this.outputComp = (<OutputComponent>componentRef.instance);
        this.outputComp.appid = appid;
        this.outputComp.data_type = data_type;
        this.outputComp.data = item.data;
        this.outputComp.history = historyStock(appid);
    }
}

@Component({
    selector: '[out_element]',
    templateUrl: './output.element.component.html',
    styleUrls: ['./output.component.css'],
})
export class OutElementComponent {
    @Input('out_element') e: Element;
    @Out('submit') _submit = new EventEmitter();
    consoleHeight = 30;
    attrs = {};
    groups = [];
    ngOnInit(){
        this.e.attrs.forEach(a =>{
            this.attrs[a.label] = a.value;
        });
    }

    submit(e): void {
        this._submit.emit(e);
    }
}
