import {Component, Input, Output as Out, EventEmitter, OnInit} from '@angular/core';
import { MyHistory} from './history';
class Photo {
    title: string;
    small_url: string;
    url: string;
    intro: string;
}

import { ScreenComponent }    from './screen.component';

@Component({
    templateUrl: './photo.component.html',
    styleUrls: ['./photo.component.css'],
})
export class PhotoComponent implements ScreenComponent {
    @Input('data') data: Photo[];
    @Input('data_type') data_type: string;
    @Input('appid') appid: string;
    @Input() history: MyHistory;
    photo: Photo;

    ngOnInit() {
        this.photo = this.data[0];
    }

    show(i: number, photo: Photo) {
        this.photo = photo;
    }
}
