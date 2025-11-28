import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAuthRoutingModule } from './admin-auth-routing.module';
import { AdminAuthComponent } from './admin-auth.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AdminAuthComponent
  ],
  imports: [
    CommonModule,
    AdminAuthRoutingModule,
    MatProgressBarModule,
    FormsModule
  ]
})
export class AdminAuthModule { }
