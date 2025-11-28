import { Component, OnInit } from '@angular/core';
import {ROUTES} from "../../core/routes";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import { SocialAuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import {SocialLoginService} from "../../services/social-login.service";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css' , '../../../assets/css/theme.css']
})
export class LoginComponent implements OnInit {

  routes = ROUTES ;
  isLoading = false ;

  respData : any ;
  socialUser: SocialUser | undefined;
  isLoggedin: boolean | undefined;
  currentTabIndex: number = 0;

  form = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  constructor(
      private fb: UntypedFormBuilder,
      private snackbarService: SnackbarService,
      private authService : AuthService , private router : Router ,
  private route: ActivatedRoute,
  public socialAuthService: SocialAuthService ,
  public socialLoginService : SocialLoginService
  ) { }

  ngOnInit(): void {

    // @ts-ignore
    this.route.queryParams
      .subscribe((params: any) => {
          console.log(params);
          if(params.role && params.role === 'customer'){
            this.currentTabIndex = 1 ;
          }
        }
      );

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      console.log('user is');
      console.log(this.socialUser);
      this.isLoggedin = (user != null);
    });

  }

  async login(data:any) {
    try {
      this.isLoading = true;
      const resp = await this.authService.login(data).toPromise();
      console.log(resp);
      this.respData = resp ;
      if(this.respData._token && this.respData.user_id && this.respData.role && this.respData.user){
        localStorage.setItem('_token' , this.respData._token);
        localStorage.setItem('user_id' , this.respData.user_id);
        localStorage.setItem('first_name' , this.respData.user.first_name);
        localStorage.setItem('last_name' , this.respData.user.last_name);
        localStorage.setItem('email' , this.respData.user.email);
        localStorage.setItem('role' , this.respData.user.role);

        setTimeout(() =>{
          const role = localStorage.getItem('role')
          if(role === 'business'){
            this.router.navigate(['business/dashboard']);
          } else {
            this.router.navigate(['/']);
        //    this.router.navigate(['customer/dashboard']);
          }
        } , 2000);


      }

    } catch (e) {
      console.log(e);
      this.respData = {
        error : "Something went wrong ! please try again later !"
      }
    } finally {
      this.isLoading = false;
    }
  }

  async loginV2() {
    try {
      this.isLoading = true;
      const resp = await this.authService.login(this.form.value).toPromise();
      console.log(resp);
      this.respData = resp ;

      if(this.respData._token && this.respData.user_id && this.respData.role && this.respData.user){
        localStorage.setItem('_token' , this.respData._token);
        localStorage.setItem('user_id' , this.respData.user_id);
        localStorage.setItem('first_name' , this.respData.user.first_name);
        localStorage.setItem('last_name' , this.respData.user.last_name);
        localStorage.setItem('email' , this.respData.user.email);
        localStorage.setItem('role' , this.respData.user.role);
        this.snackbarService.openSnackBar("Welcome back, you have logged in successfully");

        setTimeout(() =>{
          const role = localStorage.getItem('role')
          if(role === 'business'){
            this.router.navigate(['/business/dashboard']);
          } else {
            this.router.navigate(['/']);
          }
        } , 2000);


      }

      if (this.respData.error){
        this.snackbarService.openSnackBar(this.respData.error)
      }

    } catch (e) {
      console.log(e);
      this.respData = {
        error : "Something went wrong ! please try again later !"
      }
      this.snackbarService.openSnackBar(this.respData.error)

    } finally {
      this.isLoading = false;
    }
  }


  signOut(): void {
    this.socialAuthService.signOut();
  }


  getSelectedIndex() {
    return this.currentTabIndex;

  }

  onTabChange($event: MatTabChangeEvent) {
    this.currentTabIndex = $event.index;

  }
}
