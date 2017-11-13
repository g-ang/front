import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { IMeta} from '../common.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    keyword: string;
    constructor(private router: Router, private meta: IMeta) {
        this.meta.setTitle('首页-51在线');
        this.meta.setKeywords('51在线,在线应用,技术文章,在线工具');
        this.meta.setDescription('51在线是一个通过前沿的技术提供友好的在线应用服务，在线问答服务，技术文章检索的技术型网站');
    }

    ngOnInit(){

    }

    taobaoSearch() {
        location.href = `http:\/\/ai.taobao.com/search/index.htm?key=${this.keyword}&pid=mm_16150248_25804687_146850326&unid=1&source_id=tdj_search&clk1=89a39a8b13ad76037f9438326ccda2e2&upsid=89a39a8b13ad76037f9438326ccda2e2`;
    }
}
