import {Component,Output,Input,OnChanges} from '@angular/core';
import { AccountService } from '../account.service';
import { msg, Router, user} from '../../common/common';
import {NgModel, FormControl, FormGroup, Validators, ValidatorFn, NgForm, AbstractControl } from '@angular/forms';
import {Location} from '@angular/common';

class Account {
    user: string;
    password: string;
}

@Component({
    selector:'signinScreen',
    templateUrl:'./signin.component.html',
})

export class SigninComponent implements OnChanges {
    account = new Account();
    error_msg: string;
    @Input() isLogin = true;
    verify_code: string;
    mod = 'signin';
    constructor(private accountService: AccountService, private router: Router, private location: Location) {
        accountService.auth().subscribe((test: any) => {
            this.isLogin = test.isLogin;
        });
    }

    ngOnChanges() {}

    signin() {
        this.error_msg = "";
        this.accountService.login(this.account.user, this.account.password).subscribe(
            (re: any) => {
                if (re.isSucc) {
                    user.headimg = re.headimg;
                    user.nick = re.nick;
                    user.uid = re.uid;
                    user.unreadmessagecount = re.unreadmessagecount;
                    this.router.navigateByUrl('/welcome');
                } else {
                    msg.error(re.error_msg);
                }
            }
        )
    }

  
}
