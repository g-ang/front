import {Input, Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Page } from './page';
import {Router, ActivatedRoute, Params} from '@angular/router';
@Component({
    selector: '[page]',
    templateUrl: 'page.component.html'
})
export class PageComponent implements OnInit {
    @Input('page') page: number;
    @Input('total') total: number;
    @Input('rowcount') rowcount: number;
    @Input('mod') mod: string;
    @Input('baseurl') baseurl: string;
    @Output('callback') callback = new EventEmitter();
    nextOff = false;
    previousOff = true;
    pagetotal = 0;
    offset = 0;
    constructor(
        private route: ActivatedRoute,
        private router: Router) {

    }

    ngOnInit() {
        //this.baseurl = this.router.lo;

        if (this.mod == undefined) {
            this.mod = "def";
        }

        if (this.rowcount > this.total) {
            this.nextOff = true;
        }

       
        this.pagetotal = Math.ceil(this.total / this.rowcount);
    }

    next() {
        this.page++;
        this.call();
    }

    previous() {
        this.page--;
        this.call();
    }

    reload() {
        this.call();
    }

    call() {
        this.offset = Math.ceil(this.rowcount * (this.page - 1));
        this.callback.next(new Page(this.offset, this.rowcount));
        this.test(this.offset);
    }

    last() {
        this.page = this.pagetotal;
        this.call();
    }

    first() {
        this.page = 1;
        this.call();
    }

    test(offset: number) {
        if (offset + this.rowcount >= this.total) {
            this.nextOff = true;
        } else {
            this.nextOff = false;
        }
        if (offset == 0) {
            this.previousOff = true;
        } else {
            this.previousOff = false;
        }
    }
}
