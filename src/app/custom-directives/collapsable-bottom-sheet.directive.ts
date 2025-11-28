import {Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CanExpandOrCollapse} from "../models/Common";

@Directive({
  selector: '[appCollapsableBottomSheet]'
})
export class CollapsableBottomSheetDirective implements OnInit, OnChanges {

  @Input() heightOnFullExpanded: number = 100;
  @Input() heightOnHalfExpanded: number = 50;
  @Input() heightOnCollapsed: number = 10;
  @Input() heightOnHidden: number = 0;

  @Input() initialState: string = "expanded"
  @Input() sheetState: string = this.initialState
  @Input() cornersRounded: number = 16;


  constructor(
      private host: ElementRef<HTMLElement>
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.sheetState){
      this.setCollapsibleState(this.sheetState);
    }
  }

  ngOnInit(): void {

    this.setCollapsibleState(this.initialState)
  }

  collapsibleState: string = "hidden";

  setCollapsibleState(state: string){
    let translateY = 0;
    let rounded: number = 0;
    if (state === "hidden"){
      translateY = 100 - this.heightOnHidden;
      rounded = 0
    } else if (state === "collapsed"){
      translateY = 100 - this.heightOnCollapsed;
      rounded = this.cornersRounded
    } else if(state === "expanded"){
      translateY = 100 - this.heightOnFullExpanded ;
      rounded = 0;
    }

    console.log(translateY);

    this.host.nativeElement.style.setProperty(`transform`, `translateY(${translateY}vh)`);
    this.host.nativeElement.style.setProperty(`transition`, `ease-in 0.4s`);
    this.host.nativeElement.style.setProperty('border-top-right-radius', `${rounded}px`);
    this.host.nativeElement.style.setProperty('border-top-left-radius', `${rounded}px`);

    this.sheetState = state

    switch (state) {

      case 'expanded' : {
        // alert('Expanded')
        document.getElementById('section-main-sidebar')?.classList.add('visibility-hidden');
        break;
      }
      case 'hidden' : {
        // alert('Hidden')
        document.getElementById('section-main-sidebar')?.classList.remove('visibility-hidden');
        break;
      }
      case 'collapsed' : {
        // alert('Collapsed')
        document.getElementById('section-main-sidebar')?.classList.remove('visibility-hidden');
        break;
      }

      default: {

      }
    }
  }



}
