import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ListingService} from "../../services/listing.service";
import {AuthService} from "../../services/auth.service";
import {PlanService} from "../../services/plan.service";
import {MatDialog} from "@angular/material/dialog";
import {FileUploadService} from "../../services/file-upload.service";
import {SharePopupComponent} from "../../shared/share-popup/share-popup.component";
import html2canvas from "html2canvas";
import {environment} from "../../../environments/environment";
import {
  FavoriteBusinessBottomSheetComponent
} from "../favorite-business-bottom-sheet/favorite-business-bottom-sheet.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-favorite-loyalty-card',
  templateUrl: './favorite-loyalty-card.component.html',
  styleUrls: ['./favorite-loyalty-card.component.css']
})
export class FavoriteLoyaltyCardComponent implements OnInit {
  @Input() loyalty_card: any = null;
  @Input() favorite: any
  business: any = null;
  @ViewChild('downloadLink') downloadLink: ElementRef | undefined;
  @Input() referrer_id: any = null ;
  progress: boolean = false ;


  visitArray: any


  constructor(
      public listingService : ListingService ,
      public authService: AuthService,
      public planService: PlanService,
      public dialog: MatDialog,
      public uploadService: FileUploadService,
      private _bottomSheet: MatBottomSheet

) { }

  ngOnInit(): void {
    if(this.loyalty_card){
      if(this.loyalty_card.card_type === 'prize'){
        this.visitArray = new Array(parseInt(this.loyalty_card.visits_for_cash));
      }
      if(this.loyalty_card.business){
        this.business = this.loyalty_card.business ;
      }

    }
  }


  openBottomSheet(): void {
    this._bottomSheet.open(FavoriteBusinessBottomSheetComponent, {
      data : {
        favorite: this.favorite
      }
    });
  }



}
