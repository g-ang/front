import {Injectable, NgModule} from '@angular/core';

import { CommonModule as NgCommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http';
import { CKEditorModule } from 'ng2-ckeditor';
@NgModule({
    imports: [
        NgCommonModule,
        FormsModule,
        BrowserModule,
        HttpClientModule,
        CKEditorModule
    ],
    declarations: [
       
    ],
    providers: [
       
    ],
    exports: [
        NgCommonModule,
        FormsModule,
        BrowserModule,
        HttpClientModule,
        CKEditorModule
    ]
})
export class CommonModule {
}
