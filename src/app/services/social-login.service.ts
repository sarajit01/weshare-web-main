import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SocialLoginService {

  socialUser: SocialUser | undefined;

  constructor(
    private http : HttpClient ,
    private authService : AuthService ,
    private socialAuthService: SocialAuthService ,
    private router : Router
  ) { }

  checkLoggedInUser(){
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      console.log('user is');
      console.log(this.socialUser);

    });
  }

  loginWithFacebook(role: string): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((data) => {
      this.saveSocialData(data , 'facebook' , role);
    });
  }

  loginWithGoogle(role: string): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
      this.saveSocialData(data , 'google' , role);
    });
  }

  async saveSocialData(data: any, mediaName: string, role: string) {

    try {
      const resp = await this.authService.socialLogin({
        email: data.email,
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        name: data.name,
        role: role,
        media: mediaName,
        photoUrl: data.photoUrl
      }).toPromise();

      if(resp.success){

        this.authService.snackbarService.openSnackBar('You have logged in successfully !');
        if(resp.user_id){
          localStorage.setItem('user_id' , resp.user_id);
          localStorage.setItem('_token' , resp._token) ;
          localStorage.setItem('role' , role);

          setTimeout(() =>{
            const role = localStorage.getItem('role')
            if(role === 'business'){
              this.router.navigate(['business/dashboard']);
            } else {
              this.router.navigate(['customer/dashboard']);
            }
          } , 2000);


        }

      }


    }catch ($exception){

    }

  }


  logout(){
    this.socialAuthService.signOut();
  }

}
