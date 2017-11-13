import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService, api_addr } from './common.service';
import { user, User} from './common/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
    qqAuthorUrl: string;
    user = user;
    userOptOpen = false;

    openQQAuthUrl: string;

    constructor(private router: Router, private commonService: CommonService) {
        this.commonService.get("/common/api/user.info").subscribe((re: any) => {
            if (re.isSucc) {
                user.headimg = re.headimg;
                user.nick = re.nick;
                user.uid = re.uid;
                user.unreadmessagecount = re.unreadmessagecount;
            }
        });
    }

    openQQAuthScreen() {
        let screen =window.open(`${api_addr}/common/api/auth/openQQAuthScreen`, 'QQ登录','width=760,height=500');

    }

    signin() {
        this.router.navigate(['/signin']);
    }

    userOpts() {
        this.userOptOpen = !this.userOptOpen;
    }

    signOut() {
        this.userOptOpen = false;
        this.commonService.get("/common/api/signOut").subscribe((re: any) => {
            if (re.isSucc) {
                this.user = new User();
            }
        });
    }

}
