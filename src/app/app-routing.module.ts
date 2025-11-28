import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {MainLayoutComponent} from "./components/main-layout/main-layout.component";
import {PromotionComponent} from "./components/promotion/promotion.component";
import {BusinessResultComponent} from "./components/business-result/business-result.component";
import {BusinessDetailComponent} from "./business/business-detail/business-detail.component";
import {PromotionDetailComponent} from "./components/promotion-detail/promotion-detail.component";
import {DashboardComponent} from "./business-user/dashboard/dashboard.component";
import {CreateBusinessComponent} from "./components/create-business/create-business.component";
import {CustomerDashboardComponent} from "./customer/customer-dashboard/customer-dashboard.component";
import {BusinessUsersComponent} from "./components/business-users/business-users.component";
import {BusinessAppointmentComponent} from "./components/business-appointment/business-appointment.component";
import {ROUTES} from "./core/routes";
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {PrivacyPolicyComponent} from "./components/privacy-policy/privacy-policy.component";
import {TermsComponent} from "./components/terms/terms.component";
import {CreatePromotionComponent} from "./components/create-promotion/create-promotion.component";
import {AuthGuard} from "./guards/auth.guard";
import {ManageBusinessComponent} from "./components/manage-business/manage-business.component";
import {ManagePromotionsComponent} from "./components/manage-promotions/manage-promotions.component";
import {CreateAdComponent} from "./components/create-ad/create-ad.component";
import {ManageAdsComponent} from "./components/manage-ads/manage-ads.component";
import {MyFavoritesComponent} from "./customer/my-favorites/my-favorites.component";
import {EditBusinessComponent} from "./components/edit-business/edit-business.component";
import {AddBusinessUserComponent} from "./components/add-business-user/add-business-user.component";
import {CreateNotificationComponent} from "./components/create-notification/create-notification.component";
import {SelectPlanComponent} from "./components/select-plan/select-plan.component";
import {PaymentComponent} from "./components/payment/payment.component";
import {CustomerMessagesComponent} from "./components/customer-messages/customer-messages.component";
import {BusinessRepliesComponent} from "./components/business-replies/business-replies.component";
import {BusinessAppointmentSettingsComponent} from "./components/business-appointment-settings/business-appointment-settings.component";
import {EditPromotionComponent} from "./components/edit-promotion/edit-promotion.component";
import {EditBusinessAdComponent} from "./components/edit-business-ad/edit-business-ad.component";
import {BookingRequestsComponent} from "./business-user/booking-requests/booking-requests.component";
import {BusinessInvitationComponent} from "./components/business-invitation/business-invitation.component";
import {BusinessesComponent} from "./components/businesses/businesses.component";
import {DelegateAccessComponent} from "./components/delegate-access/delegate-access.component";
import {PromotionResultsComponent} from "./business/promotion-results/promotion-results.component";
import {BusinessNotificationsComponent} from "./business-user/business-notifications/business-notifications.component";
import {
  EditBusinessNotificationComponent
} from "./business-user/edit-business-notification/edit-business-notification.component";
import {CustomerClaimsComponent} from "./business-user/customer-claims/customer-claims.component";
import {AppointmentsComponent} from "./business-user/appointments/appointments.component";
import {AdminGuard} from "./guards/admin.guard";
import {CustomerProfileComponent} from "./customer/customer-profile/customer-profile.component";
import {BusinessProfileComponent} from "./business-user/business-profile/business-profile.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {ResetPassComponent} from "./components/reset-pass/reset-pass.component";
import {GalleryViewComponent} from "./components/gallery-view/gallery-view.component";
import {CreateLCComponent} from "./components/create-lc/create-lc.component";
import {ManageLCComponent} from "./components/manage-lc/manage-lc.component";
import {EditLoyaltyCardComponent} from "./components/edit-loyalty-card/edit-loyalty-card.component";
import {LoyaltyCardDetailsComponent} from "./components/loyalty-card-details/loyalty-card-details.component";
import {RewardsTableComponent} from "./components/rewards-table/rewards-table.component";
import {MyListingsComponent} from "./customer/my-listings/my-listings.component";
import {ManageDiscountsComponent} from "./components/manage-discounts/manage-discounts.component";
import {MyReferralNetworkComponent} from "./shared/my-referral-network/my-referral-network.component";
import {SignupSelectRoleComponent} from "./components/signup-select-role/signup-select-role.component";
import {SearchResultsComponent} from "./components/search-results/search-results.component";
import {MyAppointmentsComponent} from "./shared/my-appointments/my-appointments.component";
import {UserSettingsComponent} from "./shared/user-settings/user-settings.component";
import {NotificationsComponent} from "./shared/notifications/notifications.component";
import {MyPaymentsComponent} from "./business-user/my-payments/my-payments.component";



// @ts-ignore
const routes: Routes = [
  {
    path : 'register' ,
    component : SignupSelectRoleComponent,

  },
  {

    path : '' ,
    component : MainLayoutComponent ,
    children : [
      {
        path : '' ,
        component : HomeComponent,

      },
      {
        path : 'listings/:listing_type' ,
        component : HomeComponent,

      },
      {
        path : ROUTES.privacy_policy ,
        component : PrivacyPolicyComponent,

      },
      {
        path : ROUTES.terms ,
        component : TermsComponent,

      },
      {
        path : ROUTES.register+'/:role' ,
        component : RegisterComponent,

      },
      {
        path : ROUTES.login ,
        component : LoginComponent,

      },
      {
        path : ROUTES.forgot_password ,
        component : ForgotPasswordComponent,

      },
      {
        path : ROUTES.reset_password ,
        component : ResetPassComponent,

      },
      {
        path : ROUTES.business.dashboard ,
        component : DashboardComponent ,
        canActivate : [AuthGuard]

      },
      {
        path : ROUTES.business.appointment_settings+'/:business_id' ,
        component : BusinessAppointmentSettingsComponent ,
        canActivate : [AuthGuard]

      },
      {
        path : ROUTES.business.rewards_table+'/:business_id' ,
        component : RewardsTableComponent ,
        canActivate : [AuthGuard]

      },

      {
        path : ROUTES.customer.dashboard ,
        component : CustomerDashboardComponent ,
        canActivate : [AuthGuard]


      },
      {
        path : ROUTES.customer.favorites,
        component : MyFavoritesComponent ,
        canActivate : [AuthGuard]
      },
      {
        path : ROUTES.customer.listings,
        component : MyListingsComponent ,
        canActivate : [AuthGuard]
      },
      {
        path : ROUTES.customer.profile,
        component : CustomerProfileComponent ,
        canActivate : [AuthGuard]
      },
      {
        path : ROUTES.customer.messages,
        component :  BusinessRepliesComponent,
        canActivate : [AuthGuard]
      },
      {
        path : 'customer/my-appointments' ,
        component : MyAppointmentsComponent ,
      } ,
      {
        path : 'customer/settings' ,
        component : UserSettingsComponent ,
      } ,
      {
        path : ROUTES.customer.my_referral_network,
        component :  MyReferralNetworkComponent,
        canActivate : [AuthGuard]
      },
      {
        path : ROUTES.customer.notifications,
        component :  NotificationsComponent,
        canActivate : [AuthGuard]
      },
      {
        path : 'promotions' ,
        component : PromotionComponent ,
      },
      {
        path : 'promotion-results/:cat_id' ,
        component : PromotionResultsComponent ,
      },
      {
        path : 'promotion-details/:id' ,
        component : PromotionDetailComponent ,
      },
      {
        path : 'promotion-details/:id/:shared_token' ,
        component : PromotionDetailComponent ,
      },
      {
        path : 'business-results/:cat_id' ,
        component : BusinessResultComponent,
      } ,
      {
        path : 'search-results' ,
        component : SearchResultsComponent,
      } ,
      {
        path : 'businesses' ,
        component : BusinessesComponent,

      } ,
      {
        path : 'business/:business_id/users' ,
        component : BusinessUsersComponent,
      } ,
      {
        path : 'business/:business_id/users/add' ,
        component : AddBusinessUserComponent ,
      } ,
      {
        path : 'business/my-appointments' ,
        component : MyAppointmentsComponent ,
      } ,
      {
        path : 'business/settings' ,
        component : UserSettingsComponent ,
      } ,
      {
        path : 'business-details/:id' ,
        component : BusinessDetailComponent,
      } ,
      {
        path : 'business-details/:id/:shared_token' ,
        component : BusinessDetailComponent,
      } ,
      {
        path : 'gallery/:listing_type/:id' ,
        component : GalleryViewComponent,
      } ,
      {
        path : 'appointments' ,
        component : BusinessAppointmentComponent,
        canActivate : [AuthGuard]


      } ,
      {
        path : ROUTES.business.create ,
        component : CreateBusinessComponent,
        canActivate : [AuthGuard]

      } ,
      {
        path : ROUTES.business.my_referral_network ,
        component : MyReferralNetworkComponent,
        canActivate : [AuthGuard]
      } ,
      {
        path : ROUTES.loyalty_card.create ,
        component : CreateLCComponent,
        canActivate : [AuthGuard]

      } ,
      {
        path : ROUTES.business.edit+'/:id',
        component : EditBusinessComponent,
        canActivate : [AuthGuard]

      } ,
      {
        path : ROUTES.business.create_promotion ,
        component : CreatePromotionComponent,
        canActivate : [AuthGuard]
      } ,
      {
        path : ROUTES.business.edit_promotion + '/:promotion_id' ,
        component : EditPromotionComponent,
        canActivate : [AuthGuard]
      } ,
      {
        path : ROUTES.business.edit_ad + '/:ad_id' ,
        component : EditBusinessAdComponent,
        canActivate : [AuthGuard]
      } ,
      {
        path : ROUTES.business.create_ad ,
        component : CreateAdComponent,
        canActivate : [AuthGuard]

      } ,
      {
        path : ROUTES.business.invitations ,
        component : BusinessInvitationComponent,
        canActivate : [AuthGuard]

      } ,
      {
        path : ROUTES.business.delegate_access ,
        component : DelegateAccessComponent,
        canActivate : [AuthGuard]

      } ,
      {
        path : ROUTES.business.create_notification,
        component : CreateNotificationComponent,
        canActivate : [AuthGuard]

      } ,
      {
        path : ROUTES.business.manage_business_notifications,
        component : BusinessNotificationsComponent,
        canActivate : [AuthGuard]

      } ,
      {
        path : ROUTES.business.edit_business_notification+'/:id',
        component : EditBusinessNotificationComponent,
        canActivate : [AuthGuard]

      } ,
      {
        path : ROUTES.business.select_plan,
        component : SelectPlanComponent,
        canActivate : [AuthGuard]

      } ,
      {
        path : ROUTES.business.pay,
        component : PaymentComponent,
        canActivate : [AuthGuard]

      } ,
      {
        path : ROUTES.business.manage ,
        component : ManageBusinessComponent,
        canActivate : [AuthGuard]


      },
      {
        path : ROUTES.business.notifications ,
        component : NotificationsComponent,
        canActivate : [AuthGuard]
      },
      {
        path : ROUTES.loyalty_card.manage ,
        component : ManageLCComponent,
        canActivate : [AuthGuard]

      },
      {
        path : ROUTES.loyalty_card.edit+'/:lc_id' ,
        component : EditLoyaltyCardComponent,
        canActivate : [AuthGuard]

      },
      {
        path : 'business/loyalty-cards/:id' ,
        component : LoyaltyCardDetailsComponent,
        canActivate : [AuthGuard]

      },
      {
        path : 'business/loyalty-cards/:id/:shared_token' ,
        component : LoyaltyCardDetailsComponent,
        canActivate : [AuthGuard]

      },
      {
        path : ROUTES.business.manage_promotions ,
        component : ManagePromotionsComponent,
        canActivate : [AuthGuard]

      } ,
      {
        path : ROUTES.business.manage_discounts ,
        component : ManageDiscountsComponent,
        canActivate : [AuthGuard]

      } ,
      {
        path : ROUTES.business.manage_ads ,
        component : ManageAdsComponent,
        canActivate : [AuthGuard]

      },
      {
        path : ROUTES.business.manage_customer_claims ,
        component : CustomerClaimsComponent,
        canActivate : [AuthGuard]

      },
      {
        path : ROUTES.business.business_profile ,
        component : BusinessProfileComponent,
        canActivate : [AuthGuard]

      },
      {
        path : ROUTES.business.messages ,
        component : CustomerMessagesComponent,
        canActivate : [AuthGuard]
      },
      {
        path : ROUTES.business.payments ,
        component : MyPaymentsComponent,
        canActivate : [AuthGuard]
      },
      {
        path : ROUTES.business.booking_requests ,
        component : BookingRequestsComponent,
        canActivate : [AuthGuard]

      },
      {
        path : ROUTES.business.appointments ,
        component : AppointmentsComponent,
        canActivate : [AuthGuard]

      }
    ]

  },
  {
    path : "test-"+ROUTES.customer.favorites,
    component : MyFavoritesComponent ,
    canActivate : [AuthGuard]
  },

  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'employees', loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
