import {Component, HostListener, Input, OnInit} from '@angular/core';
import {ControlValueAccessor} from "@angular/forms";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() chunks: any;

  touchstartX = 0;
  touchendX = 0;

  swipeClass: String = '' ;

  @HostListener('touchstart', ['$event']) onTouchStart(event: any) {
    this.swipeClass = '' ;
    this.touchstartX = event.changedTouches[0].screenX;

  };
  @HostListener('touchend', ['$event']) onTouchEnd(event: any) {
    this.touchendX = event.changedTouches[0].screenX;

    console.log('component is touch end', this.touchendX);
    this.checkSwipeDirection();
  }



  slider = {
    currentPosition: 0,
    max: 0 ,
    min: 0,
    items: []
  }

  constructor() {



  }

  ngOnInit(): void {

    if (this.chunks && this.chunks.length){
      this.slider.max = this.chunks.length -1 ;
      this.setSliderPosition(0);
    }

  }

  nextSlide(){
    console.log('Test next',  this.chunks.length);
    this.setSliderPosition( this.slider.currentPosition + 1)
    this.swipeClass = 'swipe-right' ;

    console.log(this.slider.currentPosition);
  }

  prevSlide(){
    console.log('Test prev');
    this.setSliderPosition(this.slider.currentPosition - 1) ;
    console.log(this.slider.currentPosition);
    this.swipeClass = 'swipe-left' ;
  }

  setSliderPosition(position: number){
    if(position <= this.slider.min){
      position = 0;
    }
    if(position >= this.slider.max){
      position = 0;
    }
    this.slider.currentPosition = position;
    this.slider.items = this.chunks[position];
    console.log(this.slider.items[0]);
  }

  checkSwipeDirection() {
    if (this.touchendX < this.touchstartX) {
      console.log('Swipped left');
      this.prevSlide();

    }
    if (this.touchendX > this.touchstartX) {
      console.log('Swipped right');
      this.swipeClass = 'swipe-right' ;
      this.nextSlide();
    }
  }

}
