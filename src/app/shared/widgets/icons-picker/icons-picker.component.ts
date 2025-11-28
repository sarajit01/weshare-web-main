import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {IconService} from "../../../services/icon.service";
import {Category, CategorySlide, IconsSlide} from "../../../models/Cat";

@Component({
  selector: 'app-icons-picker',
  templateUrl: './icons-picker.component.html',
  styleUrls: ['./icons-picker.component.css']
})
export class IconsPickerComponent implements OnInit {

  @Input() label: string = "Select an icon"
  @Output() onSelected = new EventEmitter<string>()
  @Input() selectedIcon: string | undefined
  icons: string[] = []
  slides: IconsSlide[] = []
  activeSlideIndex: number = 0
  formSearch = this.fb.group({
    search: ['']
  });

  isTyping: boolean = false
  typingTimeout: any

  constructor(
      private fb: UntypedFormBuilder,
      private iconsService: IconService
  ) { }


  ngOnInit(): void {
    this.getIcons()
  }

  async getIcons() {
    try {
      const resp = await this.iconsService.getIcons(this.formSearch.controls.search.value).toPromise()
      console.log('Icons', resp);
      if (resp.length){

        this.icons = resp
        var slides = []
        var count = 0
        var slide: IconsSlide = {icons: []}

        this.icons.forEach((icon: string) => {
          if (count == 16){
            count = 0
            slides.push(slide)
            slide = {icons: []}
          }
          slide.icons.push(icon);
          count = count + 1
        })

        slides.push(slide)
        this.slides = slides

      }
    } catch (ex) {

    }
  }

  nextSlide(){
    if(this.activeSlideIndex < (this.slides.length - 1)){
      this.activateSlide(this.activeSlideIndex + 1)
    }
  }

  prevSlide(){
    if (this.activeSlideIndex > 0){
      this.activateSlide(this.activeSlideIndex - 1)
    }
  }

  activateSlide(index: number){
    if(this.slides[index]){
      this.activeSlideIndex = index
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


  loadIcons() {
    this.isTyping = true;
    if (this.typingTimeout !== null && this.typingTimeout !== undefined){
      try {
        clearTimeout(this.typingTimeout)
        console.log('Cleared timeout')
      } catch (ex){
        console.log(ex)
      }
    }
    this.typingTimeout = setTimeout(() => {
      this.isTyping = false;
      this.getIcons()
    }, 1500)

  }

  selectIcon(icon: string){

    this.onSelected.emit(icon)
  }
}
