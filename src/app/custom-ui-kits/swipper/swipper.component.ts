import {AfterViewInit, Component, HostListener, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-swipper',
  templateUrl: './swipper.component.html',
  styleUrls: ['./swipper.component.css']
})
export class SwipperComponent implements OnInit , AfterViewInit{

  touchstartX = 0;
  touchendX = 0;

  swipeClass: String = '' ;
  @Input() domID: any;
  @Input() hasNavigator: boolean = true ;
  @Input() swipeDistance: number = 400;

  @HostListener('touchstart', ['$event']) onTouchStart(event: any) {
    this.swipeClass = '' ;
    this.touchstartX = event.changedTouches[0].screenX;
  };
  @HostListener('touchend', ['$event']) onTouchEnd(event: any) {
    this.touchendX = event.changedTouches[0].screenX;
    this.checkSwipeDirection();
  }

  constructor() { }

  ngOnInit(): void {
    this.domID = this.generateDomId(10, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

  }

  checkSwipeDirection() {
    if (this.touchendX < this.touchstartX) {
      console.log('Swipped left');
    }
    if (this.touchendX > this.touchstartX) {
      console.log('Swipped right');
      this.swipeClass = 'swipe-right';
    }
  }

  scrollLeft() {
    console.log('scrolled left');
    try{
      // @ts-ignore
      document.getElementById(this.domID).scrollLeft -= this.swipeDistance
    } catch (e){
      console.log(e);
    }
  }

  scrollRight() {
    console.log('scrolled right');
    try{
      // @ts-ignore
      document.getElementById(this.domID).scrollLeft += this.swipeDistance
    } catch (e){
      console.log(e);
    }
  }

  generateDomId(length: any, chars: any) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  ngAfterViewInit(): void {
    try {
      // @ts-ignore
      let height = document.getElementById(this.domID+'-swipper-container').clientHeight;

      if(height){
        // @ts-ignore
        document.getElementById(this.domID+'-navigators').style.marginTop = ((height/2)-20)+'px';
      }
    } catch (e){

    }

  }

}
