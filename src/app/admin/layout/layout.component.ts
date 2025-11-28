import { Component, OnInit } from '@angular/core';
import {ROUTES} from "../../core/routes";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {SiteSettingsService} from "../../services/site-settings.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css' , '../../../assets/css/admin.css' ]
})
export class LayoutComponent implements OnInit {

  ROUTES = ROUTES ;

  constructor(
      private _siteSettingsService: SiteSettingsService,
      public _authService: AuthService,
      private _router : Router
  ) { }

  ngOnInit(): void {
    this._siteSettingsService.initConfig();
  }

  logout() {
    this._authService.logout();
    this._router.navigate(['admin/security/login']);
  }
}
