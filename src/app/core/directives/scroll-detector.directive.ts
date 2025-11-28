import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appScrollDetector]'
})
export class ScrollDetectorDirective {

  @Output() scrolledToBottom = new EventEmitter<boolean>();
  @Output() scrolledToTop = new EventEmitter<boolean>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('scroll')
  onScroll() {
    const scrollTop = this.elementRef.nativeElement.scrollTop;
    const scrollHeight = this.elementRef.nativeElement.scrollHeight;
    const clientHeight = this.elementRef.nativeElement.clientHeight;

  //  console.log('scroll top', scrollTop)

    // Check if scrolled to the bottom
    if (scrollTop + clientHeight === scrollHeight) {
      this.scrolledToBottom.emit(true);
    }

    // Check if scrolled to the top
    if (scrollTop === 0) {
      this.scrolledToTop.emit(true);
    } else {

    }
  }

}
