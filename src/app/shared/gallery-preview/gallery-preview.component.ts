import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-gallery-preview',
  templateUrl: './gallery-preview.component.html',
  styleUrls: ['./gallery-preview.component.css']
})
export class GalleryPreviewComponent implements OnInit {

  listingInPreview: any;
  @Input() previewState: string = "hidden"
  @Input() gallery: any
  @Input() clickedAt: any

  @Input() listing: any
  @Input() activeItemIndex: number = 0

  @Output() closed = new EventEmitter()

  displayType: string = "vertical"

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
    if (this.displayType === 'horizontal'){
      this.switchDisplayType('vertical')
    } else {
      this.changePreviewState('hidden')
      this.closed.emit(true)
    }
  }

  onSwipeDown(): void {
    if (this.displayType === 'vertical'){
      this.changePreviewState("hidden")
    } else {
      setTimeout(()=> {
        this.switchDisplayType('vertical');
      }, 1000)
    }
  }

  onSwipeUp(): void {
    this.changePreviewState('expanded')
  }

  onSwipeLeft(){
    this.nextItem()
  }

  onSwipeRight(){
    this.prevItem()
  }

  switchDisplayType(displayType: string) {
    this.displayType = displayType
  }

  onItemClick(index: any){
    this.activeItemIndex = index;
    this.switchDisplayType('horizontal')
  }

  nextItem(){
    if (this.activeItemIndex < (this.gallery.length - 1)){
      this.setActiveItemIndex(this.activeItemIndex + 1)
    } else {
      this.setActiveItemIndex(0)
    }
  }

  prevItem(){
    if (this.activeItemIndex > 0){
      this.setActiveItemIndex(this.activeItemIndex - 1);
    } else {
      this.setActiveItemIndex(this.gallery.length - 1)
    }
  }
  setActiveItemIndex(index: number){
    if (this.gallery[index]){
      this.activeItemIndex = index
    }
  }
}
