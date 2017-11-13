import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule }    from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { ArticleComponent, ArticleService, IMeta} from './article.component';
import {DetailComponent } from './detail/detail.component';
import {EmptyComponent } from './empty/empty.component';
import { SearchModule } from '../search/search.component';
import { ListingComponent } from './listing/listing.component';

import { AnswerComponent } from './answer/answer.component';
import { PageComponent } from '../common/page/page.component';
import { WarnComponent } from '../common/warn/warn.component';
import { ContentDirective } from './content.directive';
const routes: Routes = [
    {
        path: 'article',
        
        component: ArticleComponent,
        
    },
    {
        path: 'article/:label',
        component: ArticleComponent,
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        HttpModule,
        FormsModule,
        SearchModule,
        BrowserModule.withServerTransition({ appId: 'front' }),
     
    ],
    exports: [RouterModule, ListingComponent],
    declarations: [
        DetailComponent,
        ArticleComponent, 
        EmptyComponent,
        ListingComponent,
        AnswerComponent,
        PageComponent,
        WarnComponent,
        ContentDirective
    ],
    providers: [
        ArticleService,
        IMeta
    ], entryComponents:[
        DetailComponent,
    ],
})

export class ArticleModule { }
