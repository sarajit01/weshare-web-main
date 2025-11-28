import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteSettingsComponent } from './site-settings.component';
import {LayoutComponent} from "../layout/layout.component";
import {GoogleConfigComponent} from "./google-config/google-config.component";
import {CountriesComponent} from "./countries/countries.component";
import {CitiesComponent} from "./cities/cities.component";
import {SMTPSettingsComponent} from "./smtpsettings/smtpsettings.component";
import {AdminGuard} from "../../guards/admin.guard";
import {ApiKeysComponent} from "./api-keys/api-keys.component";
import {TranslatorComponent} from "./translator/translator.component";
import {PaymentGatewayConfigComponent} from "./payment-gateway-config/payment-gateway-config.component";

const routes: Routes = [
  { path: '', component: LayoutComponent,
    children : [
      {
        path: 'google', component: GoogleConfigComponent,

      },
      {
        path: 'api-keys', component: ApiKeysComponent,

      },
      {
        path: 'payment-gateways', component: PaymentGatewayConfigComponent,

      },
      {
        path: 'smtp', component: SMTPSettingsComponent,

      },
      {
        path: 'translations/:ln', component: TranslatorComponent,

      },
      {
        path: 'countries', component: CountriesComponent

      },
      {
        path: 'countries/:id', component: CitiesComponent

      },
    ],

  },
  { path: 'appearance', loadChildren: () => import('./appearance/appearance.module').then(m => m.AppearanceModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteSettingsRoutingModule { }
