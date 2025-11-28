import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "../layout/layout.component";
import {AdminAuthComponent} from "./admin-auth.component";

const routes: Routes =
  [{ path: '', component: LayoutComponent ,
    children: [
      {
        path: 'login', component: AdminAuthComponent,
      }
    ],

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAuthRoutingModule { }
