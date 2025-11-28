import {HostListener, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private deviceWidth: number | undefined;
  private deviceHeight: number | undefined;
  carouselActiveItemIndex: number = 0


  setDeviceWidth() :void{
    this.deviceWidth = window.innerWidth;
    console.log('Device width ', this.deviceWidth)
  }
  constructor() {
    this.setDeviceWidth()
  }

  getDeviceHeight(){
    return window.innerHeight ;
  }

  setDeviceHeight() :void{
    this.deviceHeight = window.innerHeight;
  }

  isMobile(){
    // @ts-ignore
    if (this.deviceWidth <= 600){
      return true;
    }
    return false;
  }

  isMobileOrTablet(){
    // @ts-ignore
    if (this.deviceWidth <= 780){
      return true;
    }
    return false;
  }

  onCarouselScroll($event: any, list: any, itemClass: string) {

    var activeItemIndex = 0
    // console.log(`Scrolling`);
    // console.log($event.srcElement.scrollLeft);
    // console.log($event.srcElement.clientWidth);

    var scrollPosition = $event.srcElement.scrollLeft;

    var element = document.getElementsByClassName(itemClass);
    if (element[0]) {
      var itemWidth = element[0].getBoundingClientRect().width
      // console.log(element[0].getBoundingClientRect().width)
      var totalWidth = itemWidth * list.length
      // console.log(totalWidth);

      if (itemWidth > 0 && scrollPosition > 0) {
        var currentItem = scrollPosition / itemWidth
        // console.log(currentItem);
        return Math.round(currentItem);

      } else {
        return  0
      }
    }
    return 0
  }


}
