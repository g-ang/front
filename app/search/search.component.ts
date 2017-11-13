import { Component, OnInit, Input, NgModule} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { Routes, RouterModule } from '@angular/router';
import { HttpModule }    from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

    result: any[];
    @Input('keyword') keyword;
    id: number;
    constructor(
        private route: ActivatedRoute,
        private router: Router) {
        this.route.queryParams.forEach(parame => {
            if (parame['id']) {
                this.id = parame['id'];
            }
        })
    }

    ngOnInit() { }

    onSearch(event) {
      if (event.keyCode == 13) {
          this.result = [];
          if (this.id > 0) {
              this.router.navigateByUrl(`/article/${this.keyword}?id=${this.id}`);
          } else {
              this.router.navigateByUrl(`/article/${this.keyword}`);
          }


      }
  }
}

@NgModule({
    imports: [
        HttpModule,
        FormsModule,
    ],
    declarations: [
        SearchComponent,
    ],
    exports: [SearchComponent]
})
export class SearchModule { }
