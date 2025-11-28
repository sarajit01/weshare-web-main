import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import {TranslateModule} from "@ngx-translate/core";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import { AddCustomerVisitComponent } from './add-customer-visit/add-customer-visit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSelectModule} from "@angular/material/select";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import { AddCustomerRewardComponent } from './add-customer-reward/add-customer-reward.component';
import { EmployeeActivitiesComponent } from './employee-activities/employee-activities.component';
import {MatDialogModule} from "@angular/material/dialog";
import { LoginComponent } from './login/login.component';
import {ActivatedRouteSnapshot, RouterModule} from "@angular/router";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NgxScannerQrcodeModule} from "ngx-scanner-qrcode";
import {ZXingScannerModule} from "@zxing/ngx-scanner";
import { DebitCustomerRewardComponent } from './debit-customer-reward/debit-customer-reward.component';
import { CustomerRewardHistoryComponent } from './customer-reward-history/customer-reward-history.component';


@NgModule({
  declarations: [
    EmployeesComponent,
    AddCustomerVisitComponent,
    AddCustomerRewardComponent,
    EmployeeActivitiesComponent,
    LoginComponent,
    DebitCustomerRewardComponent,
    CustomerRewardHistoryComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    TranslateModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatDialogModule,
    RouterModule,
    FormsModule,
    MatProgressSpinnerModule,
    ZXingScannerModule,


  ]
})
export class EmployeesModule { }
