import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input, OnChanges,
  OnInit,
  Output, SimpleChanges
} from '@angular/core';

import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {DeviceService} from "../../../services/device.service";
import {
  FavoriteBusinessBottomSheetComponent
} from "../../../customer/favorite-business-bottom-sheet/favorite-business-bottom-sheet.component";
import {Overlay} from "@angular/cdk/overlay";

@Component({
  selector: 'app-featured-lccarousel',
  templateUrl: './featured-lccarousel.component.html',
  styleUrls: ['./featured-lccarousel.component.css'],
})
export class FeaturedLCCarouselComponent implements OnInit{

  @Output() onLcSelected = new EventEmitter<any>()
  @Input() business: any
  @Input() lcs: any = []
  @Input() displayMode: string = "basic"
  @Input() displayEntitiesOnly: boolean = false
  @Input() transparentBg: boolean = false
  @Input() checkCompletedVisits: boolean = false
  carouselId: any = crypto.randomUUID();


  activeSlideIndex: number = 0
  constructor(
      private bottomSheet: MatBottomSheet,
      public deviceService: DeviceService,
      private overlay: Overlay,
      private changeDetectorRef: ChangeDetectorRef
  ) {
    console.log(changeDetectorRef)
  }


  ngOnInit(): void {
  }

  // ngAfterViewInit() {
  //   // setTimeout(() => {
  //   //   this.subscribeToObserver();
  //   // }, 2000)
  //
  // }

  subscribeToObserver(){
    this.lcs.forEach((lc: any) => {
      this.subscribeToIntersecting(lc)
    })
  }

  onItemClick(favorite: any){
    if (this.displayMode === 'rewards'){
      if (favorite) {
        this.openBottomSheet(favorite)
      }
    }
  }


  openBottomSheet(favorite: any): void {
    this.bottomSheet.open(FavoriteBusinessBottomSheetComponent, {
      data : {
        favorite: favorite
      } ,
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });
  }


  subscribeToIntersecting(lc: any){
    // @ts-ignore
    const container: Element = document.querySelector(".featured-carousel");
    // @ts-ignore
    const target: Element = document.getElementById("lc-featured-" + lc.id);

    const options={
      root: container,
      rootMargin: "480px",
      threshold: 1
    }

    const callBack = (entries: { isIntersecting: any; }[]) => {
      let isVisibleInViewPort = entries[0].isIntersecting;
      lc.isVisibleInViewPort = isVisibleInViewPort
      if (isVisibleInViewPort){
        console.log(`LC ${lc.card_title} ${isVisibleInViewPort}`)
      } else {
        console.log(`LC ${lc.card_title} ${isVisibleInViewPort}`)
      }

    };

    const observer = new IntersectionObserver(callBack,options);

    observer.observe(target)

  }

  onCScroll(){
   // console.log("After scroll", this.lcs.filter((lc: any) => lc.isVisibleInViewPort = true));
  }




  protected readonly Array = Array;
  protected readonly parseInt = parseInt;

  onCarouselScroll($event: any) {
    this.activeSlideIndex = this.deviceService.onCarouselScroll($event,  this.lcs , 'featured-carousel-item-lc');
  }


  onForwarded(){

    var element = document.getElementById('carousel-' + this.carouselId)
    element?.scrollBy({
      left:  348,
      behavior: 'smooth'
    })
  }

  onBack(){
    // @ts-ignore
    var element = document.getElementById('carousel-' + this.carouselId)
    element?.scrollBy({
      left:  -348,
      behavior: 'smooth'
    })
  }

}
