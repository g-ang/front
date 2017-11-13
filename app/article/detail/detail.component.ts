import { Component, OnInit ,Input,OnChanges} from '@angular/core';
import {ArticleService, Result, Article, IMeta} from '../article.service';
import { ActivatedRoute, Params } from '@angular/router';
import {msg} from '../../common/common';

@Component({
    selector: 'article-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnChanges {
    @Input() id: number;
    info: Article;
    constructor(private server: ArticleService, private route: ActivatedRoute, private meta: IMeta) {
        
    }

    ngOnChanges(){
        this.server.get(`/common/api/doc/get/${this.id}`).subscribe((res: any) => {
            this.info = <Article>res.data.item;
            let labels = [];

            if (this.info.labels.length > 0) {
                this.info.labels.forEach(v => { labels.push(v.name) });
            }
            this.meta.setTitle(this.info.title+"-技术文章-51在线");
            this.meta.setKeywords(labels.join(','));
            this.meta.setDescription(this.info.short_desc);
        })
    }

    addFav() {
        this.server.addFavorites(this.info.id).subscribe((re: any) => {
            if (re.isSucc) {
                msg.succ("收藏成功");
            } else {
                msg.error(re.error_msg);
             }
        });
    }
}
