import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appCollapsibeOnScrollEnded]'
})
export class CollapsibeOnScrollEndedDirective {

  @HostListener('touchstart', ['$event']) onTouchStart($event: any){
    this.handleTouchStart($event)
  }

  @HostListener('touchmove', ['$event']) onTouchMove($event: any){
    this.handleTouchMove($event)
  }

  @Output() onSwipeUp = new EventEmitter<any>()
  @Output() onSwipeDown = new EventEmitter<any>()


  xDown = null;
  yDown = null;
  constructor() { }


  // touch handlers
  handleTouchStart(evt: any) {
    console.log(evt);
    this.xDown = evt.touches[0].clientX;
    this.yDown = evt.touches[0].clientY;
  };
  handleTouchMove(evt: any) {
   // console.log(evt)
    if ( ! this.xDown || ! this.yDown ) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = this.xDown - xUp;
    var yDiff = this.yDown - yUp;

    console.log('scrolled to top', evt.touches[0].clientY);

    if(Math.abs( xDiff )+Math.abs( yDiff )> 20){ //to deal with to short swipes

      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {/* left swipe */
          console.log('left!');
          // this.onSwipeLeft.emit(true)
        } else {/* right swipe */
          console.log('right!');
          // this.onSwipeRight.emit(true)
        }
      } else {
        if ( yDiff > 0 ) {/* up swipe */
          console.log('Up!');
          this.onSwipeUp.emit(true)
        } else { /* down swipe */
          console.log('Down!');

          this.onSwipeDown.emit(true)
        }
      }
      /* reset values */
      this.xDown = null;
      this.yDown = null;
    }
  };



}
