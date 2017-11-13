import { Page }from './page/page';
import { PageComponent }from './page/page.component';
import { Storage } from './storage';
export { Router } from '@angular/router';
import { Msg } from './msgs';
import { User } from './user';

export var user=new User();
export var msg=new Msg();
export {
    Page,
    PageComponent,
    User
}

export var storage = new Storage("51helper:");

export function isLocalhost(): boolean {
    if (typeof window != 'undefined' && typeof window.location != 'undefined'){
      if (window.location.href.indexOf("http://g.com") > -1) {
          return true;
        }
      return false;
    }
    return true;
}

export function isAlibaba() {
    if (window.location.href.indexOf("1688.com") > -1) {
        return true;
    }
}
