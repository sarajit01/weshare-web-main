import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {
  FavoriteBusinessBottomSheetComponent
} from "../favorite-business-bottom-sheet/favorite-business-bottom-sheet.component";

@Component({
  selector: 'app-favorite-business',
  templateUrl: './favorite-business.component.html',
  styleUrls: ['./favorite-business.component.css']
})
export class FavoriteBusinessComponent implements OnInit {

  @Input() business: any
  @Input() favorite: any
  constructor(
      private authService: AuthService,
      private _bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
  }

  openBottomSheet(): void {
    this._bottomSheet.open(FavoriteBusinessBottomSheetComponent, {
      data : {
        favorite: this.favorite
      }
    });
  }



}
