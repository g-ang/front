import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AccountService } from './account.service';
import { CommonService } from '../common.service';
import { SigninComponent} from './signin/signin.component';
import { CommonModule } from '../common/common.module';

export { SigninComponent}
@NgModule({
  declarations: [
      SigninComponent
  ],
  imports: [
      CommonModule
  ],
  providers: [
      CommonService,
      AccountService
  ]
})

export class AccountModule { }
