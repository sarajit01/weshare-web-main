import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { BusinessNotificationComponent } from './business-notification/business-notification.component';
import {CustomUiKitsModule} from "../custom-ui-kits/custom-ui-kits.module";
import { ListingNotificationFormComponent } from './listing-forms/listing-notification-form/listing-notification-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {PipesModule} from "../core/utils/pipes/pipes.module";
import {RouterModule} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {NgxDropzoneModule} from "ngx-dropzone";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatButtonModule} from "@angular/material/button";
import { CustomerClaimComponent } from './customer-claim/customer-claim.component';
import {MatIconModule} from "@angular/material/icon";
import {PromotionWidgetComponent} from "./widgets/promotion-widget/promotion-widget.component";
import {MatMenuModule} from "@angular/material/menu";
import {BusinessComponent} from "./widgets/business/business.component";
import {BusinessAdComponent} from "./widgets/business-ad/business-ad.component";
import {BusinessFeaturedWidgetComponent} from "./widgets/business-featured-widget/business-featured-widget.component";
import { DealsUnderPriceComponent } from './sections/deals-under-price/deals-under-price.component';
import { RecentBusinessesComponent } from './sections/recent-businesses/recent-businesses.component';
import {BusinessFormComponent} from "./listing-forms/business-form/business-form.component";
import {BusinessAdFormComponent} from "./listing-forms/business-ad-form/business-ad-form.component";
import {PromotionFormComponent} from "./listing-forms/promotion-form/promotion-form.component";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatChipsModule} from "@angular/material/chips";
import {GooglePlaceModule} from "ngx-google-places-autocomplete";
import {BookingFormComponent} from "./widgets/booking-form/booking-form.component";
import {CustomerFeedbackFormComponent} from "./widgets/customer-feedback-form/customer-feedback-form.component";
import {ListingReviewsComponent} from "./widgets/listing-reviews/listing-reviews.component";
import {NgbRatingModule} from "@ng-bootstrap/ng-bootstrap";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { RecentlyViewedBusinessComponent } from './sections/recently-viewed-business/recently-viewed-business.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserStatisticsComponent } from './common/user-statistics/user-statistics.component';
import {TranslateModule} from "@ngx-translate/core";
import { BusinessClassicWidgetComponent } from './widgets/business-classic-widget/business-classic-widget.component';
import { AdClassicWidgetComponent } from './widgets/ad-classic-widget/ad-classic-widget.component';
import { SidebarComponent } from './widgets/sidebar/sidebar.component';
import { MenuIconComponent } from './menu-icon/menu-icon.component';
import { PromotionClassicWidgetComponent } from './widgets/promotion-classic-widget/promotion-classic-widget.component';
import { HeaderIconComponent } from './header-icon/header-icon.component';
import { LoyaltyCardFormComponent } from './listing-forms/loyalty-card-form/loyalty-card-form.component';
import { LoyaltyCardWidgetComponent } from './widgets/loyalty-card-widget/loyalty-card-widget.component';
import {ShareButtonsModule} from "ngx-sharebuttons/buttons";
import { SharePopupComponent } from './share-popup/share-popup.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { MyRewardHistoryComponent } from './my-reward-history/my-reward-history.component';
import { ListingReactionComponent } from './widgets/listing-reaction/listing-reaction.component';
import { CommentsComponent } from './comments/comments.component';
import { MyReferralNetworkComponent } from './my-referral-network/my-referral-network.component';
import { UserPointsWidgetComponent } from './user-points-widget/user-points-widget.component';
import { MobileHeaderWithBackButtonComponent } from './widgets/mobile-header-with-back-button/mobile-header-with-back-button.component';
import { CustomerStepperComponent } from './widgets/customer-stepper/customer-stepper.component';
import { MyStepperComponent } from './widgets/my-stepper/my-stepper.component';
import { CategorySelectorComponent } from './category-selector/category-selector.component';
import { ProgressBarComponent } from './widgets/progress-bar/progress-bar.component';
import { BusinessCreationCourageBottomSheetComponent } from './listing-forms/business-creation-courage-bottom-sheet/business-creation-courage-bottom-sheet.component';
import { LCPreviewBottomSheetComponent } from './listing-forms/lcpreview-bottom-sheet/lcpreview-bottom-sheet.component';
import { LCCardComponent } from './widgets/lccard/lccard.component';
import { FileUploaderComponent } from './widgets/file-uploader/file-uploader.component';
import { FeaturedBusinessesCarouselComponent } from './widgets/featured-businesses-carousel/featured-businesses-carousel.component';
import { FeaturedPromotionsCarouselComponent } from './widgets/featured-promotions-carousel/featured-promotions-carousel.component';
import { FeaturedLCCarouselComponent } from './widgets/featured-lccarousel/featured-lccarousel.component';
import { FeaturedCLCComponent } from './widgets/featured-clc/featured-clc.component';
import { IconsPickerComponent } from './widgets/icons-picker/icons-picker.component';
import { SimpleImgCarouselComponent } from './widgets/simple-img-carousel/simple-img-carousel.component';
import { MyAppointmentsComponent } from './my-appointments/my-appointments.component';
import { AppointmentCalendarBottomSheetComponent } from './my-appointments/appointment-calendar-bottom-sheet/appointment-calendar-bottom-sheet.component';
import { AppointmentActionsBottomSheetComponent } from './my-appointments/appointment-actions-bottom-sheet/appointment-actions-bottom-sheet.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import {MatTabsModule} from "@angular/material/tabs";
import { ListingFullScreenPreviewComponent } from './listing-full-screen-preview/listing-full-screen-preview.component';
import {CustomDirectivesModule} from "../custom-directives/custom-directives.module";
import { SimpleImgHorizCarouselComponent } from './widgets/simple-img-horiz-carousel/simple-img-horiz-carousel.component';
import { LogoComponent } from './widgets/logo/logo.component';
import { GalleryPreviewComponent } from './gallery-preview/gallery-preview.component';
import { GalleryItemsComponent } from './gallery-preview/gallery-items/gallery-items.component';
import { GalleryItemComponent } from './gallery-preview/gallery-items/gallery-item/gallery-item.component';
import { GalleryHorizPreviewComponent } from './gallery-horiz-preview/gallery-horiz-preview.component';
import { SimpleImgCarouselV2Component } from './widgets/simple-img-carousel-v2/simple-img-carousel-v2.component';
import {MatRippleModule} from "@angular/material/core";
import { BSPopupComponent } from './bspopup/bspopup.component';
import { AppInstallAdviserComponent } from './app-install-adviser/app-install-adviser.component';
import { SharePopupContentComponent } from './share-popup-content/share-popup-content.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { GoldenStarComponent } from './animations/golden-star/golden-star.component';
import { PointAnimationComponent } from './animations/point-animation/point-animation.component';
import { LCRewardsTableComponent } from './lcrewards-table/lcrewards-table.component';
import { LcPrizeComponent } from './lc-prize/lc-prize.component';
import { LcCardSharablePreviewComponent } from './widgets/lc-card-sharable-preview/lc-card-sharable-preview.component';
import { BusinessBottomToolbarComponent } from './listing-bottom-toolbars/business-bottom-toolbar/business-bottom-toolbar.component';
import { PromotionBottomToolbarComponent } from './listing-bottom-toolbars/promotion-bottom-toolbar/promotion-bottom-toolbar.component';
import { SponsoredAdsComponent } from './sponsored-ads/sponsored-ads.component';
import { ReferralNetworkWidgetComponent } from './referral-network-widget/referral-network-widget.component';
import { ContactListWidgetComponent } from './contact-list-widget/contact-list-widget.component';

@NgModule({
  declarations: [
    BusinessNotificationComponent,
    ListingNotificationFormComponent,
    CustomerClaimComponent,
    PromotionWidgetComponent,
    BusinessComponent,
    BusinessAdComponent,
    BusinessFeaturedWidgetComponent,
    DealsUnderPriceComponent,
    RecentBusinessesComponent,
    BusinessFormComponent,
    BusinessAdFormComponent,
    PromotionFormComponent,
    BookingFormComponent,
    CustomerFeedbackFormComponent,
    ListingReviewsComponent,
    RecentlyViewedBusinessComponent,
    UserProfileComponent,
    UserStatisticsComponent,
    BusinessClassicWidgetComponent,
    AdClassicWidgetComponent,
    SidebarComponent,
    MenuIconComponent,
    PromotionClassicWidgetComponent,
    HeaderIconComponent,
    LoyaltyCardFormComponent,
    LoyaltyCardWidgetComponent,
    SharePopupComponent,
    MyRewardHistoryComponent,
    ListingReactionComponent,
    CommentsComponent,
    MyReferralNetworkComponent,
    UserPointsWidgetComponent,
    MobileHeaderWithBackButtonComponent,
    CustomerStepperComponent,
    MyStepperComponent,
    CategorySelectorComponent,
    ProgressBarComponent,
    BusinessCreationCourageBottomSheetComponent,
    LCPreviewBottomSheetComponent,
    LCCardComponent,
    FileUploaderComponent,
    FeaturedBusinessesCarouselComponent,
    FeaturedPromotionsCarouselComponent,
    FeaturedLCCarouselComponent,
    FeaturedCLCComponent,
    IconsPickerComponent,
    SimpleImgCarouselComponent,
    MyAppointmentsComponent,
    AppointmentCalendarBottomSheetComponent,
    AppointmentActionsBottomSheetComponent,
    UserSettingsComponent,
    ListingFullScreenPreviewComponent,
    SimpleImgHorizCarouselComponent,
    LogoComponent,
    GalleryPreviewComponent,
    GalleryItemsComponent,
    GalleryItemComponent,
    GalleryHorizPreviewComponent,
    SimpleImgCarouselV2Component,
    BSPopupComponent,
    AppInstallAdviserComponent,
    SharePopupContentComponent,
    NotificationsComponent,
    GoldenStarComponent,
    PointAnimationComponent,
    LCRewardsTableComponent,
    LcPrizeComponent,
    LcCardSharablePreviewComponent,
    BusinessBottomToolbarComponent,
    PromotionBottomToolbarComponent,
    SponsoredAdsComponent,
    ReferralNetworkWidgetComponent,
    ContactListWidgetComponent,


  ],
    exports: [
        BusinessNotificationComponent,
        ListingNotificationFormComponent,
        CustomerClaimComponent,
        PromotionWidgetComponent,
        BusinessComponent,
        BusinessAdComponent,
        BusinessFeaturedWidgetComponent,
        DealsUnderPriceComponent,
        RecentBusinessesComponent,
        BusinessFormComponent,
        BusinessAdFormComponent,
        PromotionFormComponent,
        BookingFormComponent,
        CustomerFeedbackFormComponent,
        ListingReviewsComponent,
        RecentlyViewedBusinessComponent,
        UserProfileComponent,
        BusinessClassicWidgetComponent,
        AdClassicWidgetComponent,
        SidebarComponent,
        MenuIconComponent,
        PromotionClassicWidgetComponent,
        HeaderIconComponent,
        LoyaltyCardFormComponent,
        LoyaltyCardWidgetComponent,
        MobileHeaderWithBackButtonComponent,
        FeaturedBusinessesCarouselComponent,
        FeaturedPromotionsCarouselComponent,
        FeaturedLCCarouselComponent,
        ProgressBarComponent,
        SimpleImgCarouselComponent,
        MyStepperComponent,
        LCCardComponent,
        ListingFullScreenPreviewComponent,
        SimpleImgHorizCarouselComponent,
        GalleryPreviewComponent,
        SimpleImgCarouselV2Component,
        LcPrizeComponent,
        LCRewardsTableComponent,
        BusinessBottomToolbarComponent,
        SponsoredAdsComponent,
        ReferralNetworkWidgetComponent,
        ContactListWidgetComponent,

    ],
    imports: [
        CommonModule,
        CustomUiKitsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatDividerModule,
        MatFormFieldModule,
        MatSelectModule,
        NgxMatSelectSearchModule,
        PipesModule,
        RouterModule,
        MatInputModule,
        MatTooltipModule,
        CKEditorModule,
        NgxDropzoneModule,
        MatProgressBarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatRadioModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        MatChipsModule,
        FormsModule,
        GooglePlaceModule,
        NgbRatingModule,
        MatDatepickerModule,
        MatSlideToggleModule,
        TranslateModule,
        ShareButtonsModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        CustomDirectivesModule,
        MatRippleModule,
        NgOptimizedImage,
    ]
})
export class SharedModule { }
