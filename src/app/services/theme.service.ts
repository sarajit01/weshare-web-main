import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() {
    this.setAppTheme(this.getAppTheme())

    window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change',({ matches }) => {
          if (matches) {
             this.setAppTheme(this.getAppTheme())
          } else {
             this.setAppTheme(this.getAppTheme())
          }
          setTimeout(()=> {
            window.location.reload()
          }, 1500)
        })

  }




  getAppTheme(){
    return  localStorage.getItem("theme_mode") || "auto" ;
  }

  getSystemTheme() {

    if(window.matchMedia && window.matchMedia("(prefers-color-scheme:dark)").matches) {

      let matchTheme = window.matchMedia("(prefers-color-scheme:dark)");
      return "dark";
    } else {
      return "light";
    }


  }

  setAppTheme(theme: string){
    localStorage.setItem('theme_mode', theme);
    document.body.classList.remove('light');
    document.body.classList.remove('dark');

    if (theme === "auto"){
      theme = this.getSystemTheme();
    }
    document.body.classList.add(theme);
    this.setBrowserTabBackground(theme);

  }

  private setBrowserTabBackground(theme: string){

    var color = "#FFFFFF";
    if (theme === "dark"){
      color = "#15202B"
    }
    // @ts-ignore
    document.querySelector('meta[name="theme-color"]').setAttribute('content',  color);

  }
}
