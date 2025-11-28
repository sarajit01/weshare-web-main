import {Component, OnInit} from '@angular/core';
import {AppUpdateService} from "./services/app-update.service";
import {SwUpdate} from "@angular/service-worker";
import {TranslateService} from "@ngx-translate/core";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'listing';

  constructor(
    private SwUpdate: AppUpdateService,
    translate: TranslateService,
    private router: Router
  ) {

    let userLang = navigator.language;

    if(userLang === 'en-Us' || userLang === 'en'){
      userLang = 'en';
    } else if(userLang === 'es') {
      userLang = 'es'
    } else {
      userLang = 'es';
    }

    translate.setDefaultLang(localStorage.getItem('user_lang') || userLang);

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
           window.scrollTo(0, 0);
        }, 300);
      }
    });

  }

  ngOnInit(): void {

  }



}
