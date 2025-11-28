import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-gallery-horiz-preview',
  templateUrl: './gallery-horiz-preview.component.html',
  styleUrls: ['./gallery-horiz-preview.component.css']
})
export class GalleryHorizPreviewComponent implements OnInit {


  listingInPreview: any;
  @Input() previewState: string = "hidden"
  @Input() clickedAt: any

  @Input() listing: any
  @Input() galleryItemIndex: number = 0

  @Output() closed = new EventEmitter()

  constructor() {
  }



  ngOnChanges(changes: SimpleChanges): void {
    if (changes.listing || changes.galleryItemIndex || changes.previewState || changes.clickedAt) {
      this.changePreviewState("expanded")
    }
  }

  ngOnInit(): void {
  }

  changePreviewState(state: string){
    this.previewState = state
  }

  onClose(): void {
    this.changePreviewState('hidden')
    this.closed.emit(true)
  }

  onSwipeDown(): void {
    this.changePreviewState("hidden")
  }

  onSwipeUp(): void {
    this.changePreviewState('expanded')
  }



}
