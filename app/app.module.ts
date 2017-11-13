import { BrowserModule,BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ArticleModule} from './article/article.module';
import { ToolsModule} from './tools/tools.module';
import { HttpClientModule} from '@angular/common/http';

import { CommonService } from './common.service';
import {CommonModule as MyCommonModule} from './common/common.module';
import { AccountModule, SigninComponent} from './account/account.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { ItemModule } from './item/item.module';
const routes: Routes = [
    {
        path: '',
        component: HomeComponent
       
    },{
        path: 'welcome',
        component: WelcomeComponent
    },
    {
        path:'signin',
        component: SigninComponent
    }
]; 


@NgModule({
  declarations: [
      AppComponent,
      HomeComponent,
      WelcomeComponent
  ],
  imports:[
      RouterModule.forRoot(routes),
      BrowserModule.withServerTransition({ appId: 'front' }),
      ArticleModule,
      CommonModule,
      ToolsModule,
      HttpClientModule,
      AccountModule,
      BrowserTransferStateModule,
      MyCommonModule,
      ItemModule
  ],
  providers: [
      CommonService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
