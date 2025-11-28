import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {AuthService} from "../../../services/auth.service";
import {ListingService} from "../../../services/listing.service";
import {DeviceService} from "../../../services/device.service";
import {SharePopupComponent} from "../../share-popup/share-popup.component";

@Component({
  selector: 'app-simple-img-horiz-carousel',
  templateUrl: './simple-img-horiz-carousel.component.html',
  styleUrls: ['./simple-img-horiz-carousel.component.css']
})
export class SimpleImgHorizCarouselComponent implements OnInit {


  @Input() gallery: any
  @Input() itemHeight: number = 250

  @Output() itemSelected = new EventEmitter<any>()

  @Input() radiusCorners: number = 0
  @Input() previewMode: boolean = false


  constructor(
      public deviceService: DeviceService
  ) { }

  ngOnInit(): void {
  }

  activeSlideIndex: number = 0

  onCarouselScroll($event: any) {

    // console.log(`Scrolling`);
    // console.log('Scrolled Left', $event.srcElement.scrollLeft);
    // console.log('Dom width', $event.srcElement.clientWidth);
    //
    // var frameWidth = $event.srcElement.clientWidth;
    // var scrolledToLeft = $event.srcElement.scrollLeft;
    // var middlePositionOfFrame = frameWidth/2;
    //
    // if (frameWidth > scrolledToLeft && scrolledToLeft > middlePositionOfFrame){
    //   $event.srcElement.scrollLeft = frameWidth
    // } else {
    //   $event.srcElement.scrollLeft = scrolledToLeft
    // }

    //
    // var scrollPosition = $event.srcElement.scrollLeft;
    //
    // var element = document.getElementsByClassName('featured-carousel-item');
    // if (element[0]){
    //   var itemWidth = element[0].getBoundingClientRect().width
    //   console.log(element[0].getBoundingClientRect().width)
    //   var totalWidth = itemWidth * this.businesses.length
    //   console.log(totalWidth);
    //
    //   if (itemWidth > 0 && scrollPosition > 0){
    //     var currentItem = scrollPosition / itemWidth
    //     console.log(currentItem);
    //     this.activeSlideIndex = Math.round(currentItem);
    //     console.log(this.activeSlideIndex);
    //
    //   } else {
    //     this.activeSlideIndex = 0
    //   }

    // }

    this.activeSlideIndex = this.deviceService.onCarouselScroll($event, this.gallery, 'featured-carousel-item-gallery');

  }

  viewDetails(business: any) {

  }

  onItemClick(item: any){
    this.itemSelected.emit(item);
  }

}
