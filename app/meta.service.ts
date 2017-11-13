import {Injectable, Inject} from '@angular/core';
import { Meta, Title } from "@angular/platform-browser";

@Injectable()
export class IMeta{
    constructor(private meta: Meta, private title: Title) { }
   
    setTitle(title: string) {
        this.title.setTitle(title);
    }

    setKeywords(content: string) {
        this.meta.updateTag({ name: 'keywords', content: content});
    }

    setDescription(content: string) {
        this.meta.updateTag({ name: 'description', content: content});
    }

}