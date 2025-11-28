import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import {AddPlanComponent} from "./add-plan/add-plan.component";
import {BankDetailComponent} from "./bank-detail/bank-detail.component";
import {BankPaymentsComponent} from "./bank-payments/bank-payments.component";
import {BusinessClaimsComponent} from "./business-claims/business-claims.component";
import {BusinessManagerComponent} from "./business-manager/business-manager.component";
import {CategoryComponent} from "./category/category.component";
import {CustomAttributesComponent} from "./custom-attributes/custom-attributes.component";
import {EditCategoryComponent} from "./edit-category/edit-category.component";
import {EditPlanComponent} from "./edit-plan/edit-plan.component";
import {FeatureComponent} from "./feature/feature.component";
import {LayoutComponent} from "./layout/layout.component";
import {ManageBannersComponent} from "./manage-banners/manage-banners.component";
import {ManageCategoryComponent} from "./manage-category/manage-category.component";
import {ManagePlansComponent} from "./manage-plans/manage-plans.component";
import {ManageSubscriptionsComponent} from "./manage-subscriptions/manage-subscriptions.component";
import {ManageUserComponent} from "./manage-user/manage-user.component";
import {UpdateBusinessComponent} from "./update-business/update-business.component";
import {UpdatePromotionComponent} from "./update-promotion/update-promotion.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {SharedModule} from "../shared/shared.module";
import {MatSelectModule} from "@angular/material/select";
import {NgxDropzoneModule} from "ngx-dropzone";
import { ConfigComponent } from './config/config.component';
import { CreateBusinessComponent } from './create-business/create-business.component';
import { CreatePromotionComponent } from './create-promotion/create-promotion.component';
import { CreateAdComponent } from './create-ad/create-ad.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { PixelpayPaymentsComponent } from './pixelpay-payments/pixelpay-payments.component';


@NgModule({
  declarations: [
    AdminComponent,
    AddPlanComponent,
    BankDetailComponent,
    BankPaymentsComponent,
    BusinessClaimsComponent,
    BusinessManagerComponent,
    CategoryComponent,
    CustomAttributesComponent,
    EditCategoryComponent,
    EditPlanComponent,
    FeatureComponent,
    LayoutComponent,
    ManageBannersComponent,
    ManageCategoryComponent,
    ManagePlansComponent,
    ManageSubscriptionsComponent,
    ManageUserComponent,
    UpdateBusinessComponent,
    UpdatePromotionComponent,
    ConfigComponent,
    CreateBusinessComponent,
    CreatePromotionComponent,
    CreateAdComponent,
    UserDetailComponent,
    ResetPassComponent,
    PixelpayPaymentsComponent
  ],
  exports:[
    AdminComponent,
    AddPlanComponent,
    BankDetailComponent,
    BankPaymentsComponent,
    BusinessClaimsComponent,
    BusinessManagerComponent,
    CategoryComponent,
    CustomAttributesComponent,
    EditCategoryComponent,
    EditPlanComponent,
    FeatureComponent,
    LayoutComponent,
    ManageBannersComponent,
    ManageCategoryComponent,
    ManagePlansComponent,
    ManageSubscriptionsComponent,
    ManageUserComponent,
    UpdateBusinessComponent,
    UpdatePromotionComponent
  ],

  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    FormsModule,
    SharedModule,
    MatSelectModule,
    NgxDropzoneModule,

  ]
})
export class AdminModule { }
