import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "../layout/layout.component";
import {PagesComponent} from "./pages/pages.component";
import {CreatePageComponent} from "./create-page/create-page.component";
import {EditPageComponent} from "./edit-page/edit-page.component";
import {AdminGuard} from "../../guards/admin.guard";

const routes: Routes = [
  { path: '', component: LayoutComponent,
    children : [
      {
        path: 'pages' , component: PagesComponent
      },
      {
        path: 'create-page' , component: CreatePageComponent
      },
      {
        path: 'pages/:id' , component: EditPageComponent
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CMSRoutingModule { }
