import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ROUTES} from "../../core/routes";
import {SocialUser} from "angularx-social-login";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css']
})
export class AdminAuthComponent implements OnInit {
  progress: boolean = false;

  routes = ROUTES ;
  isLoading = false ;

  respData : any ;
  isLoggedin: boolean | undefined;


  constructor(
    private authService : AuthService , private router : Router,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  async login(data:any) {
    try {
      this.progress = true;
      const resp = await this.authService.login(data).toPromise();
      console.log(resp);
      this.respData = resp ;
      if(this.respData._token && this.respData.user_id && this.respData.role && this.respData.role === 'admin'){

        localStorage.setItem('_token' , this.respData._token);
        localStorage.setItem('user_id' , this.respData.user_id);
        localStorage.setItem('role' , this.respData.role);

        setTimeout(() =>{
          const role = localStorage.getItem('role')
          if(role === 'admin'){
            this.router.navigate(['admin/users/business']);

          } else {

          }
        } , 1000);


      } else {
        this.respData = {
          error: 'Unable to login as admin'
        };
      }

    } catch (e: any) {
      console.log(e);
      this.respData = {
        error: e.getMessage()
      };
      this.snackbarService.openSnackBar(e.getMessage().toString());
    } finally {
      this.progress = false;
    }
  }

}
