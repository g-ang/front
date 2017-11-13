import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule }    from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '../common/common.module';
import { AlibaibafasteditComponent } from './alibaibafastedit/alibaibafastedit.component';
import { EzbuyService } from './alibaibafastedit/ezbuy.service';
const routers: Routes = [
    {
        path: "alibaibafastedit/:item_id", component: AlibaibafasteditComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routers),
        FormsModule,
        BrowserModule,
        HttpModule,
        CommonModule
       
    ],
    declarations: [
        AlibaibafasteditComponent

    ],
    providers: [
        EzbuyService
    ],
    exports: [
     
    ],
    entryComponents: [
      
    ]
})

export class ItemModule{

}
