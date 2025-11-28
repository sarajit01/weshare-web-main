import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MayHaveListingDetailedPreview} from "../../models/Common";

@Component({
  selector: 'app-listing-full-screen-preview',
  templateUrl: './listing-full-screen-preview.component.html',
  styleUrls: ['./listing-full-screen-preview.component.css']
})
export class ListingFullScreenPreviewComponent implements OnInit, OnChanges, MayHaveListingDetailedPreview {

  listingInPreview: any;
  previewState: string = "expanded"

  @Input() listing: any
  @Output() stateChanged: EventEmitter<string> = new EventEmitter()

  constructor() {
  }



  ngOnChanges(changes: SimpleChanges): void {
    if (changes.listing) {
       this.changePreviewState("expanded")
       document.getElementById('listing-preview-bs-content')!.scrollTop = 0 ;

    }
  }

  ngOnInit(): void {

    document.getElementById('listing-preview-bs-content')!.scrollTop = 0 ;
  }

  changePreviewState(state: string){
    this.previewState = state
    this.stateChanged.emit(this.previewState)
  }

  onClose(): void {
     this.changePreviewState('hidden')
  }

  onSwipeDown(): void {
    var scrollY = document.getElementById('listing-preview-bs-content')?.scrollTop;
    // @ts-ignore
    if (scrollY <= 0) {

    }

    if (this.previewState === "expanded") {
      this.changePreviewState("collapsed")
    } else {
      if (this.previewState === "collapsed") {
        this.changePreviewState("hidden")
      }
    }

  }

  onScrollDown(): void {
    var scrollY = document.getElementById('listing-preview-bs-content')?.scrollTop;
    // @ts-ignore
    if (scrollY <= 10) {
      this.changePreviewState("hidden")
      // if (this.previewState === "expanded") {
      //   this.changePreviewState("collapsed")
      // } else {
      //   if (this.previewState === "collapsed") {
      //     this.changePreviewState("hidden")
      //   }
      // }
    }

  }

  onSwipeUp(): void {
     this.changePreviewState('expanded')
  }

  scrollToSection(sectionId: string) {
    // @ts-ignore
    document.getElementById(sectionId).scrollIntoView({behavior: 'smooth'});
  }

  onScrollTop() {
    console.log('scroll Y position' , document.getElementById('listing-preview-bs-content')?.scrollTop)

  }
}
