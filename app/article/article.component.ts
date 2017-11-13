import { Component, OnInit, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import {ArticleService, Result, Article, IMeta, Content, search_config} from './article.service';
import {ContentDirective} from './content.directive';
import {DetailComponent} from './detail/detail.component';

import { Meta, Title } from "@angular/platform-browser";
import {ActivatedRoute, Params } from '@angular/router';
import {Page} from '../common/page/page';

export {ArticleService, Article, IMeta}
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
   styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit {

    articles: Article[];
    id: number;
    info: Article;
    offset = 0;
    rowcount = 20;
    total = 0;
    page = 1;
    keyword = "";
    detial_url = "/article"
    loading: boolean;
    search_config = search_config;
    @ViewChild(ContentDirective) outputHost: ContentDirective;
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private server: ArticleService,
        private route: ActivatedRoute,
        private meta: IMeta) {
        this.meta.setTitle('文章列表');
        this.meta.setKeywords('文章列表,技术文章');
        this.meta.setDescription('扫搜相关的技术文章');
        this.route.queryParams.subscribe((params: Params) => {
            if (params['id']) {
                this.id = parseInt(params['id']);
            }
        })
    }

    ngOnInit() { }
 
}
