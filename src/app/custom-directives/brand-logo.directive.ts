import {Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ThemeService} from "../services/theme.service";

@Directive({
  selector: '[appBrandLogo]'
})
export class BrandLogoDirective implements OnInit, OnChanges{

  @Input() width: number = 50
  private theme: string | undefined
  constructor(
      private themeService: ThemeService,
      private host: ElementRef<HTMLElement>
  ) { }

  bodyChangeCallback(mutationList: any, observer: any) {
   console.log("Something changed in body");
   console.log(mutationList);
   var body = document.getElementsByTagName("body");
   if (body){
     if (body[0].classList.contains("dark")){
       document.getElementsByClassName("app-logo")
     } else {
       this.theme = "light"
     }
   }
 //  this.setTheme();
    // mutationList.forEach(function(mutation: any) {
    //
    //   if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
    //
    //   }
    // })
  }

  setTheme(){
    this.theme = this.themeService.getAppTheme()
  }

  ngOnInit() {
    // const body = document.querySelector('body')
    // const options = {
    //   attributes: true
    // }
    // const observer = new MutationObserver(this.bodyChangeCallback)
    // // @ts-ignore
    // observer.observe(body, options)
    this.setTheme()
    this.setLogo()
  }

  setLogo(){
    let themeName = this.theme;
    if (themeName === "auto"){
      themeName = this.themeService.getSystemTheme()
    }
    this.host.nativeElement.setAttribute(`src`, `assets/brand/logo_${themeName}.png`)
    this.host.nativeElement.setAttribute(`width`, `${this.width}px`)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.theme){
      this.setLogo()
    }
  }

}
