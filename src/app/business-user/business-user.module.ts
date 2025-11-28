import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessNotificationsComponent } from './business-notifications/business-notifications.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {SharedModule} from "../shared/shared.module";
import { EditBusinessNotificationComponent } from './edit-business-notification/edit-business-notification.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { CustomerClaimsComponent } from './customer-claims/customer-claims.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatTabsModule} from "@angular/material/tabs";
import {BookingRequestsComponent} from "./booking-requests/booking-requests.component";
import { AppointmentsComponent } from './appointments/appointments.component';
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import {TranslateModule} from "@ngx-translate/core";
import { MyPaymentsComponent } from './my-payments/my-payments.component';
import {MatRadioModule} from "@angular/material/radio";



@NgModule({
  declarations: [
    BusinessNotificationsComponent,
    EditBusinessNotificationComponent,
    CustomerClaimsComponent,
    DashboardComponent,
    BookingRequestsComponent,
    AppointmentsComponent,
    BusinessProfileComponent,
    MyPaymentsComponent,
  ],
  exports: [
    BusinessNotificationsComponent,
    EditBusinessNotificationComponent,
    CustomerClaimsComponent,
    DashboardComponent,
    BookingRequestsComponent,
    AppointmentsComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatDividerModule,
        RouterModule,
        MatButtonModule,
        SharedModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        MatTabsModule,
        TranslateModule,
        MatRadioModule,
        ReactiveFormsModule,

    ]
})
export class BusinessUserModule { }
