import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { IMeta} from '../common.service';
@Component({
    selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

    constructor(private router: Router, private meta: IMeta) {
        this.meta.setTitle('首页-51在线');
        this.meta.setKeywords('51在线,在线应用,技术文章,在线工具');
        this.meta.setDescription('51在线是一个通过前沿的技术提供友好的在线应用服务，在线问答服务，技术文章检索的技术型网站');
    }

    ngOnInit(){

    }
}
