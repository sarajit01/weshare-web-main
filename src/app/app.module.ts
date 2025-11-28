import {
    // APP_INITIALIZER,
    NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import {MatMenuModule} from "@angular/material/menu";
import { MatSliderModule } from '@angular/material/slider';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {MatTabsModule} from "@angular/material/tabs";
import {MatFormFieldModule} from "@angular/material/form-field";
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { PromotionComponent } from './components/promotion/promotion.component';
import { BusinessResultComponent } from './components/business-result/business-result.component';
import { FeaturedBusinessComponent } from './components/widgets/business/featured-business/featured-business.component';
import { BusinessDetailComponent } from './business/business-detail/business-detail.component';
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatInputModule} from "@angular/material/input";
import {MatChipsModule} from "@angular/material/chips";
import {DragDropModule} from "@angular/cdk/drag-drop";
import { PromotionDetailComponent } from './components/promotion-detail/promotion-detail.component';
import { CreateBusinessComponent } from './components/create-business/create-business.component';
import {MatRadioModule} from "@angular/material/radio";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { NgxDropzoneModule } from 'ngx-dropzone';
import { BusinessUsersComponent } from './components/business-users/business-users.component';
import { BusinessAppointmentComponent } from './components/business-appointment/business-appointment.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { environment } from '../environments/environment';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { RegisterFormDirective } from './core/directives/register-form.directive';
import {MatSelectModule} from "@angular/material/select";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { TermsComponent } from './components/terms/terms.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { FacebookLoginProvider, SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { CreatePromotionComponent } from './components/create-promotion/create-promotion.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { BusinessProfileComponent } from './components/business-profile/business-profile.component';
import { ManageBusinessComponent } from './components/manage-business/manage-business.component';
import { ManagePromotionsComponent } from './components/manage-promotions/manage-promotions.component';
import { CreateAdComponent } from './components/create-ad/create-ad.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { ManageAdsComponent } from './components/manage-ads/manage-ads.component';
import { EditBusinessComponent } from './components/edit-business/edit-business.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SearchPipe } from './core/pipes/search.pipe';
import { SearchBusinessPipe } from './core/pipes/search-business.pipe';
import { SearchCategoryPipe } from './core/pipes/search-category.pipe';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AddBusinessUserComponent } from './components/add-business-user/add-business-user.component';
import { SidebarModule } from 'ng-sidebar';
import { CreateNotificationComponent } from './components/create-notification/create-notification.component';
import { SelectPlanComponent } from './components/select-plan/select-plan.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ActiveMembershipPipe } from './core/pipes/active-membership.pipe';
import { ApprovedPipe } from './core/pipes/approved.pipe';
import { ListingContactFormComponent } from './components/listing-contact-form/listing-contact-form.component';
import { CustomerMessagesComponent } from './components/customer-messages/customer-messages.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BusinessReplyComponent } from './components/business-reply/business-reply.component';
import {MatDialogModule} from "@angular/material/dialog";
import { BusinessRepliesComponent } from './components/business-replies/business-replies.component';
import { CustomerReplyComponent } from './components/customer-reply/customer-reply.component';
import { BusinessAppointmentSettingsComponent } from './components/business-appointment-settings/business-appointment-settings.component';
import { EditPromotionComponent } from './components/edit-promotion/edit-promotion.component';
import { EditBusinessAdComponent } from './components/edit-business-ad/edit-business-ad.component';
import {HashLocationStrategy, LocationStrategy, PathLocationStrategy} from "@angular/common";
import { BusinessInvitationComponent } from './components/business-invitation/business-invitation.component';
import { CategoriesBarComponent } from './components/widgets/categories-bar/categories-bar.component';
import { BusinessesComponent } from './components/businesses/businesses.component';
import { BusinessHorizontalComponent } from './components/widgets/business-horizontal/business-horizontal.component';
import { DelegateAccessComponent } from './components/delegate-access/delegate-access.component';
import { MyBusinessPipe } from './core/pipes/my-business.pipe';
import { RandomAdsComponent } from './components/widgets/random-ads/random-ads.component';
import { PromotionResultsComponent } from './business/promotion-results/promotion-results.component';
import { PromotionHorizontalComponent } from './components/widgets/promotion-horizontal/promotion-horizontal.component';
import {CustomUiKitsModule} from "./custom-ui-kits/custom-ui-kits.module";
import {BusinessUserModule} from "./business-user/business-user.module";
import {SharedModule} from "./shared/shared.module";
import {PipesModule} from "./core/utils/pipes/pipes.module";
import {CustomerModule} from "./customer/customer.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPassComponent } from './components/reset-pass/reset-pass.component';
import { GalleryViewComponent } from './components/gallery-view/gallery-view.component';
import { ScrollDetectorDirective } from './core/directives/scroll-detector.directive';
import { CreateLCComponent } from './components/create-lc/create-lc.component';
import { ManageLCComponent } from './components/manage-lc/manage-lc.component';
import { EditLoyaltyCardComponent } from './components/edit-loyalty-card/edit-loyalty-card.component';
import { LoyaltyCardDetailsComponent } from './components/loyalty-card-details/loyalty-card-details.component';
import {ShareButtonsModule} from "ngx-sharebuttons/buttons";
import {ShareIconsModule} from "ngx-sharebuttons/icons";
import { RewardsTableComponent } from './components/rewards-table/rewards-table.component';
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import { ManageDiscountsComponent } from './components/manage-discounts/manage-discounts.component';
import { BusinessOwnerActionsBottomSheetComponent } from './components/business-owner-actions-bottom-sheet/business-owner-actions-bottom-sheet.component';
import { PromotionOwnerActionsBottomSheetComponent } from './components/promotion-owner-actions-bottom-sheet/promotion-owner-actions-bottom-sheet.component';
import { LCOwnerActionBottomSheetComponent } from './components/lcowner-action-bottom-sheet/lcowner-action-bottom-sheet.component';
import { ObserveVisibilityDirective } from './core/directives/observe-visibility.directive';
import { SignupSelectRoleComponent } from './components/signup-select-role/signup-select-role.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SearchFilterBottomSheetComponent } from './components/search-filter-bottom-sheet/search-filter-bottom-sheet.component';
import { BusinessDetailOptionsPopupComponent } from './business/business-detail-options-popup/business-detail-options-popup.component';
import { ScheduleAppointmentPopupComponent } from './business/schedule-appointment-popup/schedule-appointment-popup.component';
import { ListingDetailsBottomSheetComponent } from './business/listing-details-bottom-sheet/listing-details-bottom-sheet.component';
import { DraggableDirective } from './core/directives/draggable.directive';
import {CustomDirectivesModule} from "./custom-directives/custom-directives.module";
import {DBConfig, NgxIndexedDBModule, ObjectStoreSchema} from 'ngx-indexed-db';
import businessSchema from "./schemas/business.schema";
import promotionSchema from "./schemas/promotion.schema";
import loyaltyCardSchema from "./schemas/loyalty_card.schema";
import categorySchema from "./schemas/category.schema";
import DBTableNames, {
    businessDbTableName,
    categoryDbTableName,
    featuredBusinessDbTableName,
    featuredLCDbTableName,
    featuredPromotionDbTableName,
    listingsDbTableName,
    loyaltyCardDbTableName,
    promotionDbTableName
} from "./schemas/dbTableNames.schema";
import listingsSchema from "./schemas/listings.schema";
import favoriteSchema from "./schemas/favorite.schema";
import profileSchema from "./schemas/profile.schema";
import { PaymentsFilterBSComponent } from './components/payments-filter-bs/payments-filter-bs.component';
import { BusinessDetailSimulatePreviewComponent } from './business/business-detail-simulate-preview/business-detail-simulate-preview.component';
// import { DatabaseService, initDatabase } from './db';
// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, environment.api+'language/', '');
}

// Ahead of time compiles requires an exported function for factories
export function migrationFactory() {
    // The animal table was added with version 2 but none of the existing tables or data needed
    // to be modified so a migrator for that version is not included.
    return {
        1: (db: any, transaction: { objectStore: (arg0: string) => any; }) => {
            const store = transaction.objectStore('people');
            store.createIndex('country', 'country', { unique: false });
        },
        3: (db: any, transaction: { objectStore: (arg0: string) => any; }) => {
            const store = transaction.objectStore('people');
            store.createIndex('age', 'age', { unique: false });
        }
    };
}

export function getDbTableSchemaAttr(attribute: string): ObjectStoreSchema {
   return { name: attribute , keypath: attribute, options: { unique: false } }
}
const dbConfig: DBConfig  = {
    name: 'weshare-web-v1.4',
    version: 1.4,
    objectStoresMeta: [
        {
            store: businessDbTableName,
            storeConfig: {keyPath: 'id', autoIncrement: false},
            storeSchema: businessSchema
        },
        {
            store: promotionDbTableName,
            storeConfig: {keyPath: 'id', autoIncrement: false},
            storeSchema: promotionSchema
        },
        {
            store: loyaltyCardDbTableName,
            storeConfig: {keyPath: 'id', autoIncrement: false},
            storeSchema: loyaltyCardSchema
        },
        {
            store: categoryDbTableName,
            storeConfig: {keyPath: 'id', autoIncrement: false},
            storeSchema: categorySchema
        },
        {
            store: featuredBusinessDbTableName,
            storeConfig: {keyPath: 'id', autoIncrement: false},
            storeSchema: businessSchema
        },
        {
            store: featuredPromotionDbTableName,
            storeConfig: {keyPath: 'id', autoIncrement: false},
            storeSchema: promotionSchema
        },
        {
            store: featuredLCDbTableName,
            storeConfig: {keyPath: 'id', autoIncrement: false},
            storeSchema: loyaltyCardSchema
        },
        {
            store: listingsDbTableName,
            storeConfig: {keyPath: 'id', autoIncrement: true},
            storeSchema: listingsSchema
        },
        {
            store: DBTableNames.businessDetailDbTableName,
            storeConfig: {keyPath: 'id', autoIncrement: false},
            storeSchema: businessSchema
        },
        {
            store: DBTableNames.promotionDetailDbTableName,
            storeConfig: {keyPath: 'id', autoIncrement: false},
            storeSchema: promotionSchema
        },
        {
            store: DBTableNames.loyaltyCardDetailDbTableName,
            storeConfig: {keyPath: 'id', autoIncrement: false},
            storeSchema: loyaltyCardSchema
        },
        {
            store: DBTableNames.favoritesDbTableName,
            storeConfig: {keyPath: 'id', autoIncrement: false},
            storeSchema: favoriteSchema
        },
        {
            store: DBTableNames.profileDbTableName,
            storeConfig: {keyPath: 'id', autoIncrement: false},
            storeSchema: profileSchema
        },

    ],
    // provide the migration factory to the DBConfig
    // migrationFactory
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainLayoutComponent,
    PromotionComponent,
    BusinessResultComponent,
    FeaturedBusinessComponent,
    BusinessDetailComponent,
    PromotionDetailComponent,
    CreateBusinessComponent,
    BusinessUsersComponent,
    BusinessAppointmentComponent,
    RegisterComponent,
    LoginComponent,
    RegisterFormDirective,
    TermsComponent,
    PrivacyPolicyComponent,
    CreatePromotionComponent,
    BusinessProfileComponent,
    ManageBusinessComponent,
    ManagePromotionsComponent,
    PromotionComponent,
    CreateAdComponent,
    ManageAdsComponent,
    EditBusinessComponent,
    SearchPipe,

    SearchBusinessPipe,
    SearchCategoryPipe,
    AddBusinessUserComponent,
    CreateNotificationComponent,
    SelectPlanComponent,
    PaymentComponent,
    ActiveMembershipPipe,
    ApprovedPipe,
    ListingContactFormComponent,
    CustomerMessagesComponent,
    BusinessReplyComponent,
    BusinessRepliesComponent,
    CustomerReplyComponent,
    BusinessAppointmentSettingsComponent,
    EditPromotionComponent,
    EditBusinessAdComponent,
    BusinessInvitationComponent,
    CategoriesBarComponent,
    BusinessesComponent,
    BusinessHorizontalComponent,
    DelegateAccessComponent,
    MyBusinessPipe,
    RandomAdsComponent,
    PromotionResultsComponent,
    PromotionHorizontalComponent,
    ForgotPasswordComponent,
    ResetPassComponent,
    GalleryViewComponent,
    ScrollDetectorDirective,
    CreateLCComponent,
    ManageLCComponent,
    EditLoyaltyCardComponent,
    LoyaltyCardDetailsComponent,
    RewardsTableComponent,
    ManageDiscountsComponent,
    BusinessOwnerActionsBottomSheetComponent,
    PromotionOwnerActionsBottomSheetComponent,
    LCOwnerActionBottomSheetComponent,
    ObserveVisibilityDirective,
    SignupSelectRoleComponent,
    SearchResultsComponent,
    SearchFilterBottomSheetComponent,
    BusinessDetailOptionsPopupComponent,
    ScheduleAppointmentPopupComponent,
    ListingDetailsBottomSheetComponent,
    DraggableDirective,
    PaymentsFilterBSComponent,
    BusinessDetailSimulatePreviewComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatMenuModule,
        MatSliderModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatListModule,
        MatTabsModule,
        MatFormFieldModule,
        MatCardModule,
        MatTableModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatProgressBarModule,
        MatInputModule,
        MatChipsModule,
        DragDropModule,
        MatRadioModule,
        CKEditorModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        NgxDropzoneModule,
        HttpClientModule,
        MatBottomSheetModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: true,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:10000'
        }),
        FormsModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatSnackBarModule,
        SocialLoginModule,
        MatSlideToggleModule,
        MatTooltipModule,
        NgxMatSelectSearchModule,
        GooglePlaceModule,
        SidebarModule,
        NgbModule,
        MatDialogModule,
        CustomUiKitsModule,
        BusinessUserModule,
        SharedModule,
        PipesModule,
        CustomerModule,
        ShareButtonsModule,
        ShareIconsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        MatRippleModule,
        CustomDirectivesModule,
        NgxIndexedDBModule.forRoot(dbConfig)


    ],
    providers: [
        // {
        //     provide: APP_INITIALIZER,
        //     useFactory: () => initDatabase,
        //     multi: true,
        //     deps: [
        //         /* your dependencies */
        //     ],
        // },
        // DatabaseService,
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: FacebookLoginProvider.PROVIDER_ID,
                        provider: new FacebookLoginProvider(
                            environment.facebook.app_id
                        )
                    },
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider(
                            environment.google.client_id
                        )
                    }
                ]
            } as SocialAuthServiceConfig,
        }, {
            provide: LocationStrategy, useClass: PathLocationStrategy
        }],
    exports: [
        SearchBusinessPipe,
        DraggableDirective,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
