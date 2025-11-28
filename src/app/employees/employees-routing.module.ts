import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees.component';
import {EmployeeGuard} from "../guards/employee.guard";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {
    path: ':business_id',
    component: EmployeesComponent,
  },
  {
    path: ':business_id/login',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
