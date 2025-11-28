import {Component, Input, OnInit} from '@angular/core';
import {ROUTES} from "../../../core/routes";
import {SiteSettingsService} from "../../../services/site-settings.service";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {UserService} from "../../../services/user.service";
import {SweetAlertService} from "../../../services/sweet-alert.service";
import {SnackbarService} from "../../../services/snackbar.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  routes = ROUTES;
  sidebar: boolean = true;

  @Input() sidebarStyle: any;
  @Input() sidebarTextStyle: any;
  sidebarBtnStyle: any;
  progress: boolean = false;
  theme: any;
  private headerStyle: any;

  constructor(
    public _siteSettingsService: SiteSettingsService,
    public authService: AuthService,
    public router: Router,
    public userService: UserService,
    public sweet: SweetAlertService,
    public snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.getTheme();
  }

  async getTheme() {
    try {
      this.progress = true ;
      const resp = await this._siteSettingsService.get().toPromise();
      if(resp.id){
        this.theme = resp ;
        console.log("Appearance", this.theme)

        localStorage.setItem("theme_header_padding", this.theme.header_padding);
        localStorage.setItem("theme_header_bg", this.theme.header_bg);
        localStorage.setItem("theme_header_text_color", this.theme.header_text_color);
        localStorage.setItem("theme_header_icon_bg", this.theme.header_icon_bg);
        localStorage.setItem("theme_header_icon_color", this.theme.header_icon_color);
        localStorage.setItem("theme_header_btn_bg", this.theme.header_btn_bg);
        localStorage.setItem("theme_header_btn_text_color", this.theme.header_btn_text_color);
        localStorage.setItem("theme_header_btn_font_size", this.theme.header_btn_font_size);
        localStorage.setItem("theme_sidebar_bg", this.theme.sidebar_bg);
        localStorage.setItem("theme_sidebar_padding", this.theme.sidebar_padding);
        localStorage.setItem("theme_sidebar_text_color", this.theme.sidebar_text_color);
        localStorage.setItem("theme_content_bg", this.theme.content_bg);
        localStorage.setItem("theme_content_heading_text_color", this.theme.content_heading_text_color);
        localStorage.setItem("theme_content_btn_bg", this.theme.content_btn_bg);
        localStorage.setItem("theme_content_btn_text_color", this.theme.content_btn_text_color);

        // @ts-ignore
        //  document.getElementById('header').style.background =  ;
        // @ts-ignore

      }
    } catch ($ex) {
      console.log($ex);
    } finally {
      this.progress = false ;

      // @ts-ignore
      document.getElementById('header').style.padding = localStorage.getItem("theme_header_padding") ;



      this.sidebarStyle = {
        //  background: localStorage.getItem("theme_sidebar_bg"),
        //   padding: localStorage.getItem("theme_sidebar_padding"),
        //  color: localStorage.getItem("theme_sidebar_text_color"),
        'padding-left' : '20px' ,
        //  'padding-top' : '50px'

      }

      this.sidebarTextStyle = {
        color: this.theme.sidebar_text_color
      }

    }

  }

  getRole(){
    return this.authService.getRole();
  }

  navigate(link: string){
    this.router.navigate(['/'+link]);
  }

  async logout() {
    try {

      const resp = await this.authService.logout().toPromise();
      if (resp.success) {
        this.authService.removeAuthCredentials();
        this.router.navigate([ROUTES.login]);
      }

    } catch (err) {

    }


  }

  accountCloseConfirmation(){
    Swal.fire({
      title: 'Are you sure to close this account ?',
      text: 'All data related to this account will be deleted !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Confirm',
      cancelButtonText: 'No, thanks'
    }).then((result: { value: any; dismiss: any; }) => {
      if (result.value) {

        this.closeAccount();

      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })
  }

  async closeAccount() {
    try {
      this.progress = true;
      const resp = await this.userService.closeAccount(this.authService.getUserID()).toPromise();
      console.log(resp);
      if (resp.success) {
        this.sweet.successNotification('Account Closed', resp.success);
        this.logout();
      }
      if (resp.error) {
        this.snackbarService.openSnackBar(resp.error);
      }


    } catch ($exception: any) {
      this.snackbarService.openSnackBar($exception.message);

    } finally {
      this.progress = false;

    }


  }

}
