import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppearanceRoutingModule } from './appearance-routing.module';
import { AppearanceComponent } from './appearance.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LogoEditorComponent } from './logo-editor/logo-editor.component';
import {NgxDropzoneModule} from "ngx-dropzone";
import { SidebarEditorComponent } from './sidebar-editor/sidebar-editor.component';
import { HeaderEditorComponent } from './header-editor/header-editor.component';
import { ContentEditorComponent } from './content-editor/content-editor.component';
import { FooterEditorComponent } from './footer-editor/footer-editor.component';
import { GeneralComponent } from './general/general.component';
import { SocialLinksComponent } from './social-links/social-links.component';


@NgModule({
  declarations: [
    AppearanceComponent,
    LogoEditorComponent,
    SidebarEditorComponent,
    HeaderEditorComponent,
    ContentEditorComponent,
    FooterEditorComponent,
    GeneralComponent,
    SocialLinksComponent
  ],
  imports: [
    CommonModule,
    AppearanceRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
  ]
})
export class AppearanceModule { }
