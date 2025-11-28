import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddPlanComponent} from "./add-plan/add-plan.component";
import {ROUTES} from "../core/routes";
import {CategoryComponent} from "./category/category.component";
import {ManageCategoryComponent} from "./manage-category/manage-category.component";
import {EditCategoryComponent} from "./edit-category/edit-category.component";
import {ManagePlansComponent} from "./manage-plans/manage-plans.component";
import {BusinessClaimsComponent} from "./business-claims/business-claims.component";
import {BankDetailComponent} from "./bank-detail/bank-detail.component";
import {BankPaymentsComponent} from "./bank-payments/bank-payments.component";
import {ManageSubscriptionsComponent} from "./manage-subscriptions/manage-subscriptions.component";
import {EditPlanComponent} from "./edit-plan/edit-plan.component";
import {ManageUserComponent} from "./manage-user/manage-user.component";
import {BusinessManagerComponent} from "./business-manager/business-manager.component";
import {UpdateBusinessComponent} from "./update-business/update-business.component";
import {UpdatePromotionComponent} from "./update-promotion/update-promotion.component";
import {CustomAttributesComponent} from "./custom-attributes/custom-attributes.component";
import {ManageBannersComponent} from "./manage-banners/manage-banners.component";
import {LayoutComponent} from "./layout/layout.component";
import {AdminGuard} from "../guards/admin.guard";
import {AdminGuestGuard} from "../guards/admin-guest.guard";
import {CreateBusinessComponent} from "./create-business/create-business.component";
import {CreatePromotionComponent} from "./create-promotion/create-promotion.component";
import {CreateAdComponent} from "./create-ad/create-ad.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {ResetPassComponent} from "./reset-pass/reset-pass.component";
import {PixelpayPaymentsComponent} from "./pixelpay-payments/pixelpay-payments.component";

const routes: Routes = [
  { path: '', component: LayoutComponent ,
    children : [
      {
        path : 'add-plan' ,
        component : AddPlanComponent,
        canActivate: [AdminGuard]

      },
      {
        path : ROUTES.admin.category.root ,
        canActivate: [AdminGuard],

        children : [
          {
            path: ROUTES.admin.category.add ,
            component : CategoryComponent
          } ,
          {
            path: ROUTES.admin.category.manage ,
            component : ManageCategoryComponent
          } ,
          {
            path: ':cat_id/' +ROUTES.admin.category.edit ,
            component : EditCategoryComponent
          }
        ]
      },
      {
        path : 'manage-plans' ,
        component : ManagePlansComponent,
        canActivate: [AdminGuard]

      },
      {
        path : 'pixelpay-payments' ,
        component : PixelpayPaymentsComponent,
        canActivate: [AdminGuard]

      },
      {
        path : ROUTES.admin.claims.root ,
        component : BusinessClaimsComponent,
        canActivate: [AdminGuard]

      },
      {
        path : ROUTES.admin.payment.saveBank ,
        component : BankDetailComponent,
        canActivate: [AdminGuard]

      },
      {
        path : ROUTES.admin.payment.payments ,
        component : BankPaymentsComponent,
        canActivate: [AdminGuard]

      },
      {
        path : ROUTES.admin.subscriptions.manage ,
        component : ManageSubscriptionsComponent,
        canActivate: [AdminGuard]

      },
      {
        path : ROUTES.admin.plan.root+'/:plan_id/'+ROUTES.admin.plan.edit ,
        component : EditPlanComponent,
        canActivate: [AdminGuard]

      } ,
      {
        path : ROUTES.admin.config.root+'/'+ROUTES.admin.config.google ,
        component : EditPlanComponent,
        canActivate: [AdminGuard]

      } ,
      {
        path : ROUTES.admin.users.root+'/:role' ,
        component : ManageUserComponent,
        canActivate: [AdminGuard]

      } ,
      {
        path : ROUTES.admin.users.root+'/details/:id' ,
        component : UserDetailComponent,
        canActivate: [AdminGuard]

      } ,
      {
        path : ROUTES.admin.listings.root+'/:listing_type' ,
        component : BusinessManagerComponent,
        canActivate: [AdminGuard]

      } ,
      {
        path : ROUTES.admin.listings.root+'/business/create' ,
        component : CreateBusinessComponent,
        canActivate: [AdminGuard]

      } ,
      {
        path : ROUTES.admin.listings.root+'/promotion/create' ,
        component : CreatePromotionComponent,
        canActivate: [AdminGuard]

      } ,
      {
        path : ROUTES.admin.listings.root+'/business-ads/create' ,
        component : CreateAdComponent,
        canActivate: [AdminGuard]

      } ,
      {
        path : ROUTES.admin.listings.root+'/'+ROUTES.admin.listings.business.edit+'/:id' ,
        component : UpdateBusinessComponent,
        canActivate: [AdminGuard]

      },
      {
        path : ROUTES.admin.listings.root+'/'+ROUTES.admin.listings.promotion.edit+'/:promotion_id' ,
        component : UpdatePromotionComponent,
        canActivate: [AdminGuard]

      },
      {
        path : ROUTES.admin.attributes.root+'/:cat_id' ,
        component : CustomAttributesComponent,
        canActivate: [AdminGuard]

      },
      {
        path : ROUTES.admin.banners.root+'/:cat_id' ,
        component : ManageBannersComponent,
        canActivate: [AdminGuard]

      },
      {
        path : 'reset-password',
        component : ResetPassComponent,
        canActivate: [AdminGuard]

      }
    ],
  },
  { path: 'settings', loadChildren: () => import('./site-settings/site-settings.module').then(m => m.SiteSettingsModule), canActivate: [AdminGuard] },
  { path: 'cms', loadChildren: () => import('./cms/cms.module').then(m => m.CMSModule), canActivate: [AdminGuard] },
  { path: 'security', loadChildren: () => import('./admin-auth/admin-auth.module').then(m => m.AdminAuthModule), canActivate: [AdminGuestGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
