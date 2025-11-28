import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {SnackbarService} from "../../services/snackbar.service";
import {SweetAlertService} from "../../services/sweet-alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {ROUTES} from "../../core/routes";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {ThemeService} from "../../services/theme.service";
@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  user: any
  userAction: string | undefined
  appTheme: string | null | undefined = this.themeService.getAppTheme()
  appLang: string | null | undefined = localStorage.getItem("user_lang")
  formResetPass = this.fb.group({
    current_password : ['', [Validators.required]] ,
    new_password: ['', [Validators.required]] ,
    confirm_password: ['', [Validators.required]]
  });

  formProfile = this.fb.group({
    username : [ '', [Validators.required]] ,
    first_name : ['', [Validators.required]] ,
    last_name : ['', [Validators.required]] ,
    email : ['', [Validators.required]] ,
    phone : ['', [Validators.required]] ,
  });

  progress: boolean = false;
  tab: string | undefined

  constructor(
      private fb : UntypedFormBuilder ,
      private snackbarService : SnackbarService ,
      private sweetAlert : SweetAlertService,
      private route : ActivatedRoute,
      private userService: UserService,
      public authService: AuthService,
      private router: Router,
      public sweet: SweetAlertService,
      private themeService: ThemeService


  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params["tab"]){
        this.tab = params["tab"];
        this.userAction = this.tab
      } else {
        this.tab = undefined
        this.userAction = this.tab
      }
    });
  }

  setUserAction(action: string | undefined){
    this.userAction = action
  }

  changeAppTheme(theme: string){
    this.appTheme = theme ;
    this.themeService.setAppTheme(theme)

    setTimeout(()=> {
      window.location.reload()
    }, 1500)

  }

  changeAppLang(lang: string){
    localStorage.setItem("user_lang", lang);
    this.snackbarService.openSnackBar('Please reload to apply updated language settings');
   // window.location.reload();
  }

  async resetPass() {
    try {
      this.progress = true;
      const resp = await this.userService.changePass(this.authService.getUserID() , this.formResetPass.value).toPromise();
      if(resp.success){
        this.snackbarService.openSnackBar(resp.success);
        this.formResetPass.reset();
      }
      if(resp.error){
        this.snackbarService.openSnackBar(resp.error);
      }
    } catch ($ex) {
      console.log($ex);
    } finally {
      this.progress = false;
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

  async logout() {
    try {
      this.authService.removeAuthCredentials();
      this.router.navigate([ROUTES.login]);

      const resp = await this.authService.logout().toPromise();


    } catch (err) {

    }


  }


  // async getUserDetails() {
  //   try {
  //     this.progress = true;
  //     const resp = await this.userService.getDetails(this.authService.getUserID()).toPromise();
  //     console.log('User profile', resp);
  //     if(resp.user){
  //       this.user = resp.user ;
  //       this.formProfile.controls.username.setValue(this.user.username);
  //       this.formProfile.controls.first_name.setValue(this.user.first_name);
  //       this.formProfile.controls.last_name.setValue(this.user.last_name);
  //       this.formProfile.controls.email.setValue(this.user.email);
  //       this.formProfile.controls.phone.setValue(this.user.phone);
  //       // this.onUserLoaded.emit(this.user);
  //
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     this.snackbarService.openSnackBar("Failed to retrieve profile information");
  //   } finally {
  //     this.isLoading = false;
  //   }
  // }
  //
  // async updateProfile() {
  //
  //   if(! this.formProfile.valid){
  //     this.snackbarService.openSnackBar("All the fields are required");
  //     return;
  //   }
  //
  //   try {
  //     this.progress = true;
  //     const resp = await this.userService.updateProfile(this.authService.getUserID(), this.formProfile.value).toPromise();
  //     console.log(resp);
  //     if(resp.success){
  //       this.snackbarService.openSnackBar(resp.success);
  //     }
  //     if(resp.user){
  //       this.user = resp.user ;
  //     }
  //
  //   } catch (e) {
  //     console.log(e);
  //     this._snackbarService.openSnackBar("Failed to retrieve profile information");
  //   } finally {
  //     this.isLoading = false;
  //   }
  // }
  //


}
