import { Component, OnInit } from '@angular/core';
import {ArticleService, Result, Article, IMeta} from '../article.service';
import {ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'empty',
  templateUrl: './empty.component.html',
  styleUrls: []
})
export class EmptyComponent implements OnInit {
    id: number;
    info: Article;
    constructor(private server: ArticleService, private route: ActivatedRoute, private meta: IMeta) {

    }

    ngOnInit(){
        
    }
}
