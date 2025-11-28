import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CMSRoutingModule } from './cms-routing.module';
import { CMSComponent } from './cms.component';
import { CreatePageComponent } from './create-page/create-page.component';
import {ReactiveFormsModule} from "@angular/forms";
import { PagesComponent } from './pages/pages.component';
import {EmailEditorModule} from "angular-email-editor";
import { EditPageComponent } from './edit-page/edit-page.component';


@NgModule({
  declarations: [
    CMSComponent,
    CreatePageComponent,
    PagesComponent,
    EditPageComponent
  ],
    imports: [
        CommonModule,
        CMSRoutingModule,
        ReactiveFormsModule,
        EmailEditorModule
    ]
})
export class CMSModule { }
