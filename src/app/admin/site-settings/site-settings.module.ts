import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteSettingsRoutingModule } from './site-settings-routing.module';
import { SiteSettingsComponent } from './site-settings.component';
import {CountriesComponent} from "./countries/countries.component";
import {CitiesComponent} from "./cities/cities.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { SMTPSettingsComponent } from './smtpsettings/smtpsettings.component';
import { ApiKeysComponent } from './api-keys/api-keys.component';
import { TranslatorComponent } from './translator/translator.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { PaymentGatewayConfigComponent } from './payment-gateway-config/payment-gateway-config.component';


@NgModule({
  declarations: [
    SiteSettingsComponent,
    CountriesComponent,
    CitiesComponent,
    SMTPSettingsComponent,
    ApiKeysComponent,
    TranslatorComponent,
    PaymentGatewayConfigComponent
  ],
  exports: [
    SiteSettingsComponent,
    CountriesComponent,
    CitiesComponent
  ],
    imports: [
        CommonModule,
        SiteSettingsRoutingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatProgressBarModule
    ]
})
export class SiteSettingsModule { }
