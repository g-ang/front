import { Component, OnInit, ComponentFactoryResolver, OnDestroy, NgModule, ViewChild, Input ,OnChanges} from '@angular/core';
import {ArticleService, Result, Article, IMeta, Content} from '../article.service';
import {ContentDirective} from '../content.directive';
import {DetailComponent} from '../detail/detail.component';

import { Meta, Title } from "@angular/platform-browser";
import {ActivatedRoute, Params } from '@angular/router';
import {Page} from '../../common/page/page';
import { msg } from '../../common/common';
import { HttpModule }    from '@angular/http';
import { FormsModule } from '@angular/forms';

export {ArticleService, Article, IMeta}
@Component({
    selector: 'article-listing',
  templateUrl: './listing.component.html',
   styleUrls: ['./listing.component.css']
})

export class ListingComponent implements OnInit, OnChanges {
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

    @Input('configs') configs: any;
    public style: any;

    //搜索类型
    search_type = '';

    error_msg = '';
    options=[];

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private server: ArticleService,
        private route: ActivatedRoute,
        private meta: IMeta) {
        this.route.params.subscribe((params: Params) => {
            if (params['label']) {
                this.keyword = params['label'];
                this.detial_url = "/article/" + this.keyword;
            } else {
                this.keyword = "";
                this.detial_url = "/article";
            }
            this.search();
        })

        this.route.queryParams.subscribe((params: Params) => {

            if (params['id']) {
                this.id = parseInt(params['id']);
            }

            if (params['page']) {
                let page = parseInt(params['page']);
                if (this.page == page) {
                    return;
                }
                this.page = page;
                let offset = this.rowcount * (this.page - 1);
                this.search(new Page(offset, this.rowcount));
            }
        })
    }

    ngOnInit() {
        this.options = [
            { label: '搜索', vlaue: 'search', active:true},
            //{ label: '最近访问', vlaue: 'history', active: false},
            { label: '我的收藏', value: 'favorites', active: false}
        ];
    }

    optionSw(opt: any) {
        this.options.forEach((v) => v.active = false);
        opt.active = true;
        this.search_type = opt.value;
        this.search();
    }

    

    ngOnChanges(e) {
        if (e.configs && !e.configs.hidden) {
            this.style = { displat:'block !important;'};
        } else {
            this.style = `display:none !important;`;
        }
    }

    //取消收藏
    cancelFav(index: any) {
        let info =this.articles[index];
        this.server.cancelFav(info.id).subscribe((re: any) => {
            if (re.isSucc) {
                msg.succ("取消收藏成功");
                this.articles.splice(index, 1);
            } else {
                msg.error(re.error_msg);
            }
        });
    }

    search(page?:Page) {
        let data = {
            offset: this.offset,
            limit: this.rowcount,
            orderBy: "-id",
            label: this.keyword,
        };
        if (page) {
            data.offset = page.offset
            data.limit = page.rowcount
        }
        this.loading = true;

        let url = '/common/api/doc/listing';

        switch (this.search_type) {
            case 'favorites':
                url = `/common/api/doc/listing?search_type=${this.search_type}`;
        }
        this.articles = [];
        this.error_msg = "";
        this.server.post(url,data).subscribe((res: Result) => {
            this.loading = false;
            if (res.isSucc) {
                this.articles = <Article[]>res.data.items;
                this.total = res.data.total;

                if (this.total == 0) {
                    this.error_msg = `查找 “${this.keyword}”没有任何结果`;
                }
            } else {
                this.error_msg = res.error_msg;
            }
        });
    }

  

 
}


