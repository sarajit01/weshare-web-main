import { Injectable } from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {CommentsComponent} from "../shared/comments/comments.component";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
      private _bottomSheet: MatBottomSheet
  ) { }

  openComments(listing: any, listingType: string): void {
    this._bottomSheet.open( CommentsComponent, {
      data : {
        listingType: listingType,
        listing: listing
      }
    });
  }

}
