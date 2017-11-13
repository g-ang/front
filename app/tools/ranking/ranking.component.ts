import {Component, Input, Output as Out, EventEmitter, OnInit, Type} from '@angular/core';
import {ActivatedRoute, Params } from '@angular/router';
import {FactoryService, IMeta}from '../tools.service';
import {Request, Header, Element, Attr, Seo, Screen, Output, App} from '../app';

@Component({
    selector: 'app-ranking-list',
    templateUrl: './ranking.component.html',
    styleUrls: ['./ranking.component.css']
})
export class RankingComponent{
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
    }
}
