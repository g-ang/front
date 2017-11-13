import { Injectable, Type } from '@angular/core';
import { CommonService, Result, IMeta, Observable } from '../common.service';
import {Article} from './article';
import {Http, URLSearchParams, Response} from '@angular/http';
export {Result, Article,IMeta}

@Injectable()
export class ArticleService extends CommonService {

    addFavorites(id): Observable<Object>{
       return  this.post("/common/api/doc/favorites.add", {id:id});
    }

    cancelFav(id): Observable<Object> {
        return this.post("/common/api/doc/favorites.cancel", { id: id });
    }
}

export class Content {
  constructor(public component?: Type<any>, public data?: any) { }
}

export var search_config = {
    hidden:true //隐藏文章列表
}
