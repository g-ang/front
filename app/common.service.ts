import {URLSearchParams, Http, Response, Headers, RequestOptionsArgs} from '@angular/http';

import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {IMeta } from "./meta.service"; 
export {Router}  from '@angular/router';
export { URLSearchParams, Http };
export { IMeta}
export class Result {
    error_msg: string;
    error_code: number;
    isSucc: boolean;
    data: any;
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isLocalhost, storage } from './common/common';

var api_addr = "http://g.com:8081";

if (false == isLocalhost()) {
    api_addr = "http://api.51helper.com";
}

export function getBaseUrl(){
    return api_addr;
}

@Injectable()
export class CommonService{
    constructor(private http: HttpClient) { }

    private genToken() {
        var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        var token = "";
        for (var i = 0; i < 16; i++) {
            var id = Math.ceil(Math.random() * 35);
            token += chars[id];
        }
        return token;
    }

    private getHeader(): HttpHeaders {
        let token = storage.get("token");
        if (token == "" || token == null) {
            token = this.genToken();
            storage.set("token", token);
        }
        let h = new HttpHeaders({
            "Authorization": token, "Content-Type": "aaa"
        });
        return h;
    }

    private getToken() {
        let token = storage.get("token");
        if (token == "" || token == null) {
            token = this.genToken();
            storage.set("token", token);
        }
        return token;
    }

    get(addr: string, params?: any): Observable<Object> {
        let options = { "headers": this.getHeader() }
        if (params != undefined) {
            options['params'] = params;
        }
        return this.http.get(`${api_addr}${addr}`, options);
    }

    post(addr: string, body: any, params?: any): Observable<Object> {
        let options = { "headers": this.getHeader() }
        if (params != undefined) {
            options['params'] = params;
        }
        return this.http.post(`${api_addr}${addr}`, body, options);
    }

    auth(): Observable<Object> {
        return this.get("/api/account.info");
    }
}

export { Injectable, Observable, api_addr }

export function getCookie(name: string): string {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = name + "=";
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
        c = ca[i].replace(/^\s\+/g, "");
        if (c.indexOf(cookieName) == 0) {
            return c.substring(cookieName.length, c.length);
        }
    }
    return "";
}
