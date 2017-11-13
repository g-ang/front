import { Injectable } from '@angular/core';
import { CommonService, Observable } from './../../common.service';

import {Http, URLSearchParams} from '@angular/http';

export class EzItem {
    storeid: number;
    storename: string;
    id: number;
    cid: number;
    cname:string;
    itemid: number;
    name: string;
    cnname: string;
    oldprice: number;
    price: number;
    images: string[];
    desc: string;
    sku: string;
    quant: number;
    weight: number;
    length: number;
    height: number;
    width: number;
    colors: Color[];
    sizes: Size[];
    materials=[];
}


export class Color {
    constructor(public id: number, public name: string) {}
}

export class Size {
    constructor(public id: number, public name: string) { }
}

export class Category {
    constructor(public id: number, public name: string, public pid: number) { }
}


@Injectable()
export class EzbuyService extends CommonService {

    getItem(item_id: number): Observable<Object>{
        return this.get(`/api/ezbuy.get/${item_id}?check_paste=1`);
    }

    paste(item_id: number): Observable<Object>{
   
        return this.get(`/api/ezbuy.paste/${item_id}`);
    }

    save(item: any): Observable<Object> {
        return this.post("/api/ezbuy.save",item);
    }
}
