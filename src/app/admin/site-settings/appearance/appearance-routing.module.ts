import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppearanceComponent } from './appearance.component';
import {LayoutComponent} from "../../layout/layout.component";
import {GoogleConfigComponent} from "../google-config/google-config.component";
import {CountriesComponent} from "../countries/countries.component";
import {CitiesComponent} from "../cities/cities.component";
import {LogoEditorComponent} from "./logo-editor/logo-editor.component";
import {SidebarEditorComponent} from "./sidebar-editor/sidebar-editor.component";
import {HeaderEditorComponent} from "./header-editor/header-editor.component";
import {ContentEditorComponent} from "./content-editor/content-editor.component";
import {FooterEditorComponent} from "./footer-editor/footer-editor.component";
import {GeneralComponent} from "./general/general.component";
import {SocialLinksComponent} from "./social-links/social-links.component";

const routes: Routes = [
  { path: '', component: LayoutComponent,
    children : [
      {
        path: 'editor', component: AppearanceComponent,
        children : [
          {
            path: 'general', component: GeneralComponent,

          },
          {
            path: 'logo', component: LogoEditorComponent,

          },
          {
            path: 'sidebar', component: SidebarEditorComponent,

          },
          {
            path: 'header', component: HeaderEditorComponent,

          },
          {
            path: 'content', component: ContentEditorComponent,

          },
          {
            path: 'footer', component: FooterEditorComponent,

          },
          {
            path: 'social', component: SocialLinksComponent,

          },
        ]

      },
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppearanceRoutingModule { }
