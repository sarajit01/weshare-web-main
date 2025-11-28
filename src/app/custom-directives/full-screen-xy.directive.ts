import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[appFullScreenXY]'
})
export class FullScreenXYDirective implements OnInit{

  constructor(
      private host: ElementRef<HTMLElement>
  ) {
  }

  ngOnInit() {
    this.host.nativeElement.style.setProperty(`position`, `fixed`);
    this.host.nativeElement.style.setProperty(`width`, `100vw`);
    this.host.nativeElement.style.setProperty(`height`, `100vh`);
    this.host.nativeElement.style.setProperty('left', `0px`);
    this.host.nativeElement.style.setProperty('top', `0px`);

  }

}
