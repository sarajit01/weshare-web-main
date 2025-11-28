import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-simple-img-carousel',
  templateUrl: './simple-img-carousel.component.html',
  styleUrls: ['./simple-img-carousel.component.css']
})
export class SimpleImgCarouselComponent implements OnInit {

  @Input() gallery: any = []
  @Input() activeSlideIndex: number  = 0
  @Input() containerHeight: number = 200
  constructor() { }

  ngOnInit(): void {
    if (this.activeSlideIndex > 0){
      this.setSlideInView(this.activeSlideIndex)
    }
  }

  setSlideInView(index: number){
    if( this.gallery[index]){
      this.activeSlideIndex = index
    }
  }

  nextSlide(){
    if (this.activeSlideIndex < (this.gallery.length + 1)){
      this.activeSlideIndex = this.activeSlideIndex + 1
    } else {
      this.activeSlideIndex = 0
    }
  }

  prevSlide(){
    if (this.activeSlideIndex > 0){
      this.activeSlideIndex = this.activeSlideIndex - 1
    }
  }


  xDown = null;
  yDown = null;
  handleTouchStart(evt: any) {
    this.xDown = evt.touches[0].clientX;
    this.yDown = evt.touches[0].clientY;
  };

  swippedLeft: boolean = false
  handleTouchMove(evt: any) {
    if ( ! this.xDown || ! this.yDown ) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = this.xDown - xUp;
    var yDiff = this.yDown - yUp;
    if(Math.abs( xDiff )+Math.abs( yDiff )> 20){ //to deal with to short swipes

      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {/* left swipe */
          console.log('left!');
          // @ts-ignore
          this.swippedLeft = true
          this.nextSlide()
        } else {/* right swipe */
          this.swippedLeft = false
          console.log('right!');
          this.prevSlide()
        }
      } else {
        if ( yDiff > 0 ) {/* up swipe */
          console.log('Up!');
        } else { /* down swipe */
          console.log('Down!');

        }
      }
      /* reset values */
      this.xDown = null;
      this.yDown = null;
    }
  };

}
