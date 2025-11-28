import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider/slider.component';
import { SwipperComponent } from './swipper/swipper.component';
import {MatCardModule} from "@angular/material/card";
import {BusinessCallButtonComponent} from "./buttons/business-call-button/business-call-button.component";
import {BusinessInfoButtonComponent} from "./buttons/business-info-button/business-info-button.component";
import {BusinessWhatsappButtonComponent} from "./buttons/business-whatsapp-button/business-whatsapp-button.component";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    SliderComponent,
    SwipperComponent,
    BusinessCallButtonComponent,
    BusinessInfoButtonComponent,
    BusinessWhatsappButtonComponent
  ],
  exports: [
    SliderComponent,
    SwipperComponent,
    BusinessCallButtonComponent,
    BusinessInfoButtonComponent,
    BusinessWhatsappButtonComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule
  ]
})
export class CustomUiKitsModule { }
