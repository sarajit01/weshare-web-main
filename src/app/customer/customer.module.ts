import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateClaimComponent } from './create-claim/create-claim.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { NotificationsComponent } from './notifications/notifications.component';
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {SharedModule} from "../shared/shared.module";
import {MyFavoritesComponent} from "./my-favorites/my-favorites.component";
import {RouterModule} from "@angular/router";
import {CustomerDashboardComponent} from "./customer-dashboard/customer-dashboard.component";
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import {TranslateModule} from "@ngx-translate/core";
import {CustomUiKitsModule} from "../custom-ui-kits/custom-ui-kits.module";
import { FavoriteBusinessBottomSheetComponent } from './favorite-business-bottom-sheet/favorite-business-bottom-sheet.component';
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import { FavoriteLoyaltyCardComponent } from './favorite-loyalty-card/favorite-loyalty-card.component';
import { FavoriteBusinessComponent } from './favorite-business/favorite-business.component';
import { FavoritePromotionComponent } from './favorite-promotion/favorite-promotion.component';
import { RewardsHistoryBottomSheetComponent } from './rewards-history-bottom-sheet/rewards-history-bottom-sheet.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatTabsModule} from "@angular/material/tabs";
import { MyPointsWidgetComponent } from './my-points-widget/my-points-widget.component';
import { CustomerShortCutComponent } from './customer-short-cut/customer-short-cut.component';
import { MyListingsComponent } from './my-listings/my-listings.component';
import { QRScanErrorPopupComponent } from './qrscan-error-popup/qrscan-error-popup.component';



@NgModule({
  declarations: [
    CreateClaimComponent,
    NotificationsComponent,
    MyFavoritesComponent,
    CustomerDashboardComponent,
    CustomerProfileComponent,
    FavoriteBusinessBottomSheetComponent,
    FavoriteLoyaltyCardComponent,
    FavoriteBusinessComponent,
    FavoritePromotionComponent,
    RewardsHistoryBottomSheetComponent,
    MyPointsWidgetComponent,
    CustomerShortCutComponent,
    MyListingsComponent,
    QRScanErrorPopupComponent
  ],
    exports: [
        CreateClaimComponent,
        NotificationsComponent,
        MyFavoritesComponent,
        CustomerDashboardComponent,
        MyPointsWidgetComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatProgressBarModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        SharedModule,
        RouterModule,
        TranslateModule,
        CustomUiKitsModule,
        MatBottomSheetModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatTabsModule
    ]
})
export class CustomerModule { }
