import {Component, Input, Output as Out, EventEmitter, OnInit, Type} from '@angular/core';
import {ActivatedRoute, Params } from '@angular/router';
import {FactoryService, IMeta}from './tools.service';
import {Request, Header,  Element, Attr, Seo, Screen, Output, App} from './app';

@Component({
    templateUrl:'./app.component.html'
})

export class AppComponent {
    elements = <Element[]>[];
    request = new Request();
    seo = new Seo();
    output = new Output();
    apps: App[];
    app: App;
    code: string;
    name: string;
    keyword:string;
    constructor(private server: FactoryService, private route: ActivatedRoute, private meta: IMeta) {
        this.keyword = "";
        this.server.post("/common/api/apps", {}).subscribe((res: any) => {
            if (res.isSucc) {
                this.apps = <App[]>res.items;
            }
        });

        this.route.params.subscribe((params: Params) => {
            let appid = params["id"];
            if (appid != "") {
                this.get(appid);
            }
        })
    }

    get(appid: string) {
        this.server.get(`/common/api/get/${appid}`).subscribe((res: any) => {
          
            if (res.isSucc) {
                this.app = <App>res.item;
                this.name = this.app.name;
                this.code = this.app.code;
                this.elements = this.app.screen.elements;
                this.request = this.app.request;
                this.seo = this.app.seo;
                this.output = this.app.output;

                this.meta.setTitle(this.seo.title+"-在线应用-51在线");
                this.meta.setKeywords(this.seo.keyword);
                this.meta.setDescription(this.seo.descript);
            }
        })

    }

}
