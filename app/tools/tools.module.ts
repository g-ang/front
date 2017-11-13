import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule }    from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { OutputComponent, OutElementComponent} from './output.component';
import { AppComponent} from './app.component';
import {FactoryService} from './tools.service';

import {PhotoComponent} from './output/photo.component';
import {TextComponent} from './output/text.component';


import { OutputDirective }  from './output/output.directive';
import { SearchModule } from '../search/search.component';
import { RankingComponent } from './ranking/ranking.component';
import {SelectButtonModule} from '../modules/selectbutton/selectbutton';

const routers: Routes = [
    {
        path: "apps", component: AppComponent
    },
    {
        path: "app/:id", component: AppComponent, children: []
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routers),
        FormsModule,
        BrowserModule,
        HttpModule,
        SearchModule,
        SelectButtonModule,
    ],
    declarations: [
        AppComponent,
        OutputComponent,
        OutElementComponent,
        PhotoComponent,
        OutputDirective,
        TextComponent,
        RankingComponent

    ],
    providers: [
        FactoryService,
    ],
    exports: [
        RankingComponent,
    ],
    entryComponents: [
        PhotoComponent,
        TextComponent,
    ]
})

export class ToolsModule{

}